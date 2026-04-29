import type { DeforestationCountry, TemperaturePoint } from "@/types";

export const fallbackTemperatureData: TemperaturePoint[] = [
  { year: 1975, anomaly: 0.0 },
  { year: 1980, anomaly: 0.26 },
  { year: 1985, anomaly: 0.12 },
  { year: 1990, anomaly: 0.45 },
  { year: 1995, anomaly: 0.45 },
  { year: 2000, anomaly: 0.39 },
  { year: 2005, anomaly: 0.67 },
  { year: 2010, anomaly: 0.72 },
  { year: 2015, anomaly: 0.9 },
  { year: 2020, anomaly: 1.02 },
  { year: 2021, anomaly: 0.85 },
  { year: 2022, anomaly: 0.89 },
  { year: 2023, anomaly: 1.18 },
  { year: 2024, anomaly: 1.28 }
];

export const fallbackDeforestationData: DeforestationCountry[] = [
  { id: "IND", name: "India", forestLossPercent: 2, annualLossHectares: 80000, risk: "low" }
];
