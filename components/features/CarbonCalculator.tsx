"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useCarbonCalc } from "@/hooks/useCarbonCalc";
import { CHART_COLORS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const CarbonCalculator = () => {
  const { inputs, setInputs, results } = useCarbonCalc();

  return (
    <SectionWrapper id="calculator" eyebrow="Calculator" title="Estimate your annual carbon footprint" className="bg-neutral-100">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="grid gap-5">
          <label className="grid gap-2 text-sm font-semibold">
            Car travel: {inputs.kmDrivenPerWeek} km/week
            <input className="slider-thumb h-3 w-full appearance-none rounded-full bg-neutral-200" type="range" min="0" max="800" value={inputs.kmDrivenPerWeek} onChange={(event) => setInputs({ ...inputs, kmDrivenPerWeek: Number(event.target.value) })} />
            <input className="min-h-11 rounded border border-neutral-200 px-3" type="number" value={inputs.kmDrivenPerWeek} onChange={(event) => setInputs({ ...inputs, kmDrivenPerWeek: Number(event.target.value) })} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Bike travel: {inputs.bikeKmPerWeek} km/week
            <input className="slider-thumb h-3 w-full appearance-none rounded-full bg-neutral-200" type="range" min="0" max="400" value={inputs.bikeKmPerWeek} onChange={(event) => setInputs({ ...inputs, bikeKmPerWeek: Number(event.target.value) })} />
            <input className="min-h-11 rounded border border-neutral-200 px-3" type="number" value={inputs.bikeKmPerWeek} onChange={(event) => setInputs({ ...inputs, bikeKmPerWeek: Number(event.target.value) })} />
            <span className="text-xs font-normal text-neutral-500">Bicycles are counted with a very low footprint for manufacturing and food-energy estimates.</span>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Flights per year: {inputs.flightsPerYear}
            <input className="slider-thumb h-3 w-full appearance-none rounded-full bg-neutral-200" type="range" min="0" max="12" value={inputs.flightsPerYear} onChange={(event) => setInputs({ ...inputs, flightsPerYear: Number(event.target.value) })} />
            <input className="min-h-11 rounded border border-neutral-200 px-3" type="number" value={inputs.flightsPerYear} onChange={(event) => setInputs({ ...inputs, flightsPerYear: Number(event.target.value) })} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Electricity: {inputs.electricityKwhPerMonth} kWh/month
            <input className="slider-thumb h-3 w-full appearance-none rounded-full bg-neutral-200" type="range" min="0" max="1200" value={inputs.electricityKwhPerMonth} onChange={(event) => setInputs({ ...inputs, electricityKwhPerMonth: Number(event.target.value) })} />
            <input className="min-h-11 rounded border border-neutral-200 px-3" type="number" value={inputs.electricityKwhPerMonth} onChange={(event) => setInputs({ ...inputs, electricityKwhPerMonth: Number(event.target.value) })} />
          </label>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-semibold">
              Heating
              <select className="min-h-11 rounded border border-neutral-200 px-3" value={inputs.heatingType} onChange={(event) => setInputs({ ...inputs, heatingType: event.target.value as typeof inputs.heatingType })}>
                <option value="gas">Gas</option>
                <option value="electric">Electric</option>
                <option value="none">None</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Diet
              <select className="min-h-11 rounded border border-neutral-200 px-3" value={inputs.dietType} onChange={(event) => setInputs({ ...inputs, dietType: event.target.value as typeof inputs.dietType })}>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="omnivore">Omnivore</option>
                <option value="heavy-meat">Heavy meat</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Clothes
              <select className="min-h-11 rounded border border-neutral-200 px-3" value={inputs.shoppingFrequency} onChange={(event) => setInputs({ ...inputs, shoppingFrequency: event.target.value as typeof inputs.shoppingFrequency })}>
                <option value="rarely">Rarely</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </label>
          </div>
        </Card>
        <Card>
          <p className="text-sm font-bold uppercase text-primary-400">Your result</p>
          <p className="mt-2 text-4xl font-bold text-neutral-700">{formatNumber(results.total)} tonnes CO2e</p>
          <p className="mt-1 text-neutral-600">Estimated carbon emitted per year</p>
          <div className="mt-4 h-56 min-h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={results.breakdown} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82}>
                  {results.breakdown.map((entry, index) => <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value: number) => `${formatNumber(value)}t`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-3">
            <div className="rounded bg-primary-50 p-4">
              <p className="text-sm font-semibold text-neutral-700">Mature trees needed to balance this footprint</p>
              <p className="mt-1 text-3xl font-bold text-primary-400">{results.matureTreesNeeded.toLocaleString("en-US")}</p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">Based on an average mature tree absorbing about 22 kg CO2 per year.</p>
            </div>
            <p className="rounded bg-neutral-100 p-3 text-sm text-neutral-700">
              Your footprint is {formatNumber(results.comparison)}x the global average.
            </p>
          </div>
        </Card>
      </div>
    </SectionWrapper>
  );
};
