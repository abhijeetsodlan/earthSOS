"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { BarChart3, Calculator, Download, Home, Plane, Share2, Utensils } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useCarbonCalc } from "@/hooks/useCarbonCalc";
import { CHART_COLORS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const CarbonCalculator = () => {
  const { inputs, setInputs, results } = useCarbonCalc();
  const [showResults, setShowResults] = useState(false);

  return (
    <SectionWrapper
      id="calculator"
      eyebrow="Calculator"
      title="Answer a few questions to estimate your annual carbon footprint"
      className="bg-neutral-100"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="grid gap-6">
          <QuestionGroup icon={<Plane className="h-5 w-5" aria-hidden />} title="Travel">
            <NumberQuestion
              label="Car travel"
              value={inputs.kmDrivenPerWeek}
              unit="km/week"
              min={0}
              max={1000}
              onChange={(value) => setInputs({ ...inputs, kmDrivenPerWeek: value })}
            />
            <NumberQuestion
              label="Public transport"
              value={inputs.publicTransitKmPerWeek}
              unit="km/week"
              min={0}
              max={800}
              onChange={(value) => setInputs({ ...inputs, publicTransitKmPerWeek: value })}
            />
            <NumberQuestion
              label="Bike travel"
              value={inputs.bikeKmPerWeek}
              unit="km/week"
              min={0}
              max={400}
              onChange={(value) => setInputs({ ...inputs, bikeKmPerWeek: value })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberQuestion
                label="Short flights"
                value={inputs.shortFlightsPerYear}
                unit="/year"
                min={0}
                max={20}
                onChange={(value) => setInputs({ ...inputs, shortFlightsPerYear: value })}
              />
              <NumberQuestion
                label="Long flights"
                value={inputs.longFlightsPerYear}
                unit="/year"
                min={0}
                max={12}
                onChange={(value) => setInputs({ ...inputs, longFlightsPerYear: value })}
              />
            </div>
          </QuestionGroup>

          <QuestionGroup icon={<Home className="h-5 w-5" aria-hidden />} title="Home energy">
            <NumberQuestion
              label="Electricity use"
              value={inputs.electricityKwhPerMonth}
              unit="kWh/month"
              min={0}
              max={1600}
              onChange={(value) => setInputs({ ...inputs, electricityKwhPerMonth: value })}
            />
            <NumberQuestion
              label="People in your household"
              value={inputs.householdSize}
              unit="people"
              min={1}
              max={12}
              onChange={(value) => setInputs({ ...inputs, householdSize: Math.max(value, 1) })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectQuestion
                label="Main heating"
                value={inputs.heatingType}
                onChange={(value) => setInputs({ ...inputs, heatingType: value as typeof inputs.heatingType })}
                options={[
                  ["gas", "Gas"],
                  ["electric", "Electric"],
                  ["none", "No heating"]
                ]}
              />
              <SelectQuestion
                label="Renewable electricity"
                value={inputs.renewableElectricity}
                onChange={(value) => setInputs({ ...inputs, renewableElectricity: value as typeof inputs.renewableElectricity })}
                options={[
                  ["none", "None"],
                  ["partial", "Some"],
                  ["mostly", "Mostly"]
                ]}
              />
            </div>
          </QuestionGroup>

          <QuestionGroup icon={<Utensils className="h-5 w-5" aria-hidden />} title="Food and lifestyle">
            <div className="grid gap-4 sm:grid-cols-3">
              <SelectQuestion
                label="Diet"
                value={inputs.dietType}
                onChange={(value) => setInputs({ ...inputs, dietType: value as typeof inputs.dietType })}
                options={[
                  ["vegan", "Vegan"],
                  ["vegetarian", "Vegetarian"],
                  ["omnivore", "Omnivore"],
                  ["heavy-meat", "Heavy meat"]
                ]}
              />
              <SelectQuestion
                label="New clothes"
                value={inputs.shoppingFrequency}
                onChange={(value) => setInputs({ ...inputs, shoppingFrequency: value as typeof inputs.shoppingFrequency })}
                options={[
                  ["rarely", "Rarely"],
                  ["monthly", "Monthly"],
                  ["weekly", "Weekly"]
                ]}
              />
              <SelectQuestion
                label="Waste"
                value={inputs.wasteLevel}
                onChange={(value) => setInputs({ ...inputs, wasteLevel: value as typeof inputs.wasteLevel })}
                options={[
                  ["low", "Low"],
                  ["average", "Average"],
                  ["high", "High"]
                ]}
              />
            </div>
          </QuestionGroup>

          <button
            type="button"
            onClick={() => setShowResults(true)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-primary-400 px-5 py-3 font-bold text-white transition hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            <Calculator className="h-5 w-5" aria-hidden />
            Calculate my footprint
          </button>
        </Card>

        <Card className="lg:sticky lg:top-24 lg:self-start">
          {showResults ? (
            <ResultsPanel results={results} />
          ) : (
            <div className="flex min-h-[420px] flex-col justify-center rounded bg-neutral-100 p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-400">
                <BarChart3 className="h-7 w-7" aria-hidden />
              </div>
              <p className="mt-5 text-xl font-bold text-neutral-700">Your result will appear here</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Fill the questions on travel, home energy, food, shopping, and waste, then calculate to see your estimated yearly impact.
              </p>
            </div>
          )}
        </Card>
      </div>
    </SectionWrapper>
  );
};

interface QuestionGroupProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

const QuestionGroup = ({ icon, title, children }: QuestionGroupProps) => (
  <fieldset className="grid gap-4 border-t border-neutral-200 pt-5 first:border-t-0 first:pt-0">
    <legend className="mb-1 flex items-center gap-2 text-base font-bold text-neutral-700">
      <span className="flex h-9 w-9 items-center justify-center rounded bg-primary-50 text-primary-400">{icon}</span>
      {title}
    </legend>
    {children}
  </fieldset>
);

interface NumberQuestionProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const NumberQuestion = ({ label, value, unit, min, max, onChange }: NumberQuestionProps) => (
  <label className="grid gap-2 text-sm font-semibold text-neutral-700">
    <span className="flex items-center justify-between gap-3">
      <span>{label}</span>
      <span className="text-xs font-bold text-primary-400">{value} {unit}</span>
    </span>
    <input
      className="slider-thumb h-3 w-full appearance-none rounded-full bg-neutral-200"
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
    <input
      className="min-h-11 rounded border border-neutral-200 px-3"
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  </label>
);

interface SelectQuestionProps {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (value: string) => void;
}

const SelectQuestion = ({ label, value, options, onChange }: SelectQuestionProps) => (
  <label className="grid gap-2 text-sm font-semibold text-neutral-700">
    {label}
    <select
      className="min-h-11 rounded border border-neutral-200 bg-white px-3"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map(([optionValue, optionLabel]) => (
        <option key={optionValue} value={optionValue}>{optionLabel}</option>
      ))}
    </select>
  </label>
);

interface ResultsPanelProps {
  results: ReturnType<typeof useCarbonCalc>["results"];
}

const ResultsPanel = ({ results }: ResultsPanelProps) => {
  const [shareStatus, setShareStatus] = useState<"idle" | "working" | "shared" | "saved">("idle");

  const handleShare = async () => {
    try {
      setShareStatus("working");
      const calculatorUrl = `${window.location.origin}/calculator`;
      const blob = await generateFootprintShareImage(results, calculatorUrl);
      const file = new File([blob], "earth-sos-carbon-footprint.png", { type: "image/png" });
      const shareText = `My estimated annual carbon footprint is ${formatNumber(results.total)} tonnes CO2e. Calculate yours at ${calculatorUrl}`;

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "My carbon footprint",
          text: shareText,
          files: [file]
        });
        setShareStatus("shared");
        return;
      }

      const imageUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "earth-sos-carbon-footprint.png";
      link.click();
      URL.revokeObjectURL(imageUrl);
      setShareStatus("saved");
    } catch {
      setShareStatus("idle");
    }
  };

  return (
    <>
      <p className="text-sm font-bold uppercase text-primary-400">Your result</p>
      <p className="mt-2 text-4xl font-bold text-neutral-700">{formatNumber(results.total)} tonnes CO2e</p>
      <p className="mt-1 text-neutral-600">Estimated carbon emitted per year</p>
      <div className="mt-4 h-56 min-h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={results.breakdown} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82}>
              {results.breakdown.map((entry, index) => (
                <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${formatNumber(value)}t`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-3">
        <button
          type="button"
          onClick={() => void handleShare()}
          disabled={shareStatus === "working"}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-neutral-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-70"
        >
          {shareStatus === "saved" ? <Download className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
          {shareStatus === "working" ? "Generating image..." : shareStatus === "saved" ? "Image saved" : shareStatus === "shared" ? "Shared" : "Share footprint image"}
        </button>
        <div className="rounded bg-primary-50 p-4">
          <p className="text-sm font-semibold text-neutral-700">Mature trees needed to balance this footprint</p>
          <p className="mt-1 text-3xl font-bold text-primary-400">{results.matureTreesNeeded.toLocaleString("en-US")}</p>
          <p className="mt-1 text-xs leading-5 text-neutral-500">Based on an average mature tree absorbing about 22 kg CO2 per year.</p>
        </div>
        <p className="rounded bg-neutral-100 p-3 text-sm text-neutral-700">
          Your footprint is {formatNumber(results.comparison)}x the global average.
        </p>
        <div className="grid gap-2 text-sm text-neutral-600">
          {results.breakdown.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between gap-3 rounded border border-neutral-200 px-3 py-2">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                {item.name}
              </span>
              <span className="font-bold text-neutral-700">{formatNumber(item.value)}t</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const generateFootprintShareImage = async (
  results: ReturnType<typeof useCarbonCalc>["results"],
  calculatorUrl: string
) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 675;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is not supported in this browser.");
  }

  context.fillStyle = "#F5F7F1";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#23411E";
  context.fillRect(0, 0, canvas.width, 675);
  context.fillStyle = "#97C459";
  context.beginPath();
  context.arc(1040, 120, 190, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#639922";
  context.beginPath();
  context.arc(1140, 610, 260, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#FFFFFF";
  context.font = "700 34px Inter, Arial, sans-serif";
  context.fillText("Earth S.O.S.", 72, 78);
  context.fillStyle = "#CFE6A3";
  context.font = "700 22px Inter, Arial, sans-serif";
  context.fillText("My estimated annual carbon footprint", 72, 145);

  context.fillStyle = "#FFFFFF";
  context.font = "800 96px Inter, Arial, sans-serif";
  context.fillText(`${formatNumber(results.total)} tonnes`, 72, 255);
  context.font = "800 44px Inter, Arial, sans-serif";
  context.fillText("CO2e per year", 78, 315);

  context.fillStyle = "#DDEBC4";
  context.font = "500 26px Inter, Arial, sans-serif";
  wrapCanvasText(
    context,
    `That equals about ${results.matureTreesNeeded.toLocaleString("en-US")} mature trees absorbing carbon for a year.`,
    76,
    378,
    640,
    36
  );

  const maxBreakdown = Math.max(...results.breakdown.map((item) => item.value), 1);
  results.breakdown.forEach((item, index) => {
    const y = 470 + index * 42;
    const width = 340 * (item.value / maxBreakdown);
    context.fillStyle = "rgba(255,255,255,0.18)";
    context.fillRect(76, y, 360, 16);
    context.fillStyle = CHART_COLORS[index % CHART_COLORS.length];
    context.fillRect(76, y, width, 16);
    context.fillStyle = "#FFFFFF";
    context.font = "700 20px Inter, Arial, sans-serif";
    context.fillText(item.name, 456, y + 16);
    context.fillText(`${formatNumber(item.value)}t`, 610, y + 16);
  });

  context.fillStyle = "#FFFFFF";
  context.fillRect(730, 390, 360, 164);
  context.fillStyle = "#23411E";
  context.font = "800 28px Inter, Arial, sans-serif";
  context.fillText("Calculate yours", 768, 450);
  context.fillStyle = "#4B5563";
  context.font = "500 22px Inter, Arial, sans-serif";
  wrapCanvasText(context, "Answer a few questions and see your estimated footprint.", 768, 492, 280, 30);
  context.fillStyle = "#639922";
  context.font = "800 20px Inter, Arial, sans-serif";
  context.fillText(calculatorUrl, 768, 540);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Could not generate share image."));
      }
    }, "image/png");
  });
};

const wrapCanvasText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) => {
  const words = text.split(" ");
  let line = "";

  words.forEach((word) => {
    const testLine = `${line}${word} `;
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line.trim(), x, y);
      line = `${word} `;
      y += lineHeight;
      return;
    }
    line = testLine;
  });

  context.fillText(line.trim(), x, y);
};
