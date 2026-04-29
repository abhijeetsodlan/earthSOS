import axios from "axios";
import type { DeforestationCountry } from "@/types";

const CO2_API_URL = "https://global-warming.org/api/co2-api";
const TEMPERATURE_API_URL = "https://global-warming.org/api/temperature-api";
const TREE_COVER_LOSS_API_URL =
  "https://ourworldindata.org/grapher/tree-cover-loss.csv?v=1&csvType=full&useColumnShortNames=false";

const deforestationCountries = [
  { id: "IND", name: "India" }
];

interface Co2ApiResponse {
  co2?: Array<{ year?: string; month?: string; day?: string; cycle?: string; trend?: string }>;
}

interface TemperatureApiResponse {
  result?: Array<{ time?: string; station?: string; land?: string }>;
}

const parseCsvLine = (line: string) => {
  const cells: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }

  cells.push(cell);
  return cells;
};

const getRisk = (annualLossHectares: number): DeforestationCountry["risk"] => {
  if (annualLossHectares >= 1_000_000) {
    return "high";
  }

  if (annualLossHectares >= 200_000) {
    return "medium";
  }

  return "low";
};

export const climateService = {
  async getCo2() {
    const response = await axios.get<Co2ApiResponse>(CO2_API_URL, { timeout: 7000 });
    const latest = response.data.co2?.at(-1);
    const ppm = Number(latest?.cycle ?? latest?.trend);

    if (!Number.isFinite(ppm)) {
      throw new Error("Invalid CO2 API payload");
    }

    return {
      ppm,
      date: [latest?.year, latest?.month, latest?.day].filter(Boolean).join("-")
    };
  },
  async getTemperature() {
    const response = await axios.get<TemperatureApiResponse>(TEMPERATURE_API_URL, { timeout: 7000 });
    const points = response.data.result
      ?.map((item) => ({
        year: Number(String(item.time ?? "").slice(0, 4)),
        anomaly: Number(item.station ?? item.land)
      }))
      .filter((item) => Number.isFinite(item.year) && Number.isFinite(item.anomaly))
      .filter((item) => item.year >= new Date().getFullYear() - 50);

    if (!points?.length) {
      throw new Error("Invalid temperature API payload");
    }

    return points;
  },
  async getDeforestation() {
    const response = await axios.get<string>(TREE_COVER_LOSS_API_URL, { responseType: "text", timeout: 10000 });
    const [headerLine, ...lines] = response.data.trim().split(/\r?\n/);
    const headers = parseCsvLine(headerLine);
    const entityIndex = headers.indexOf("Entity");
    const codeIndex = headers.indexOf("Code");
    const yearIndex = headers.indexOf("Year");
    const lossIndex = headers.findIndex((header) => header.toLowerCase().includes("tree cover loss"));

    if ([entityIndex, codeIndex, yearIndex, lossIndex].some((index) => index < 0)) {
      throw new Error("Invalid deforestation API payload");
    }

    const latestByCode = new Map<string, { year: number; annualLossHectares: number }>();

    lines.forEach((line) => {
      const cells = parseCsvLine(line);
      const code = cells[codeIndex];
      const year = Number(cells[yearIndex]);
      const annualLossHectares = Number(cells[lossIndex]);

      if (!deforestationCountries.some((country) => country.id === code) || !Number.isFinite(year) || !Number.isFinite(annualLossHectares)) {
        return;
      }

      const current = latestByCode.get(code);
      if (!current || year > current.year) {
        latestByCode.set(code, { year, annualLossHectares });
      }
    });

    const maxLoss = Math.max(...Array.from(latestByCode.values()).map((item) => item.annualLossHectares));

    if (!Number.isFinite(maxLoss) || maxLoss <= 0) {
      throw new Error("Missing deforestation country data");
    }

    return deforestationCountries.map((country) => {
      const latest = latestByCode.get(country.id);
      if (!latest) {
        throw new Error(`Missing deforestation data for ${country.id}`);
      }

      return {
        ...country,
        annualLossHectares: Math.round(latest.annualLossHectares),
        forestLossPercent: Math.max(1, Math.round((latest.annualLossHectares / maxLoss) * 17)),
        risk: getRisk(latest.annualLossHectares)
      };
    });
  }
};
