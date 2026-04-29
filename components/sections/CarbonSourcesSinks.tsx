import { AlertTriangle, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const carbonBudget = {
  sourcesGtCO2: 40.6,
  sinksGtCO2: 19.1,
  atmosphereGtCO2: 21.6,
  oceanSinkGtCO2: 10.6,
  landSinkGtCO2: 8.4
};

const sinkPercent = Math.round((carbonBudget.sinksGtCO2 / carbonBudget.sourcesGtCO2) * 100);
const gapGtCO2 = carbonBudget.sourcesGtCO2 - carbonBudget.sinksGtCO2;
const atmospherePercent = 100 - sinkPercent;

export const CarbonSourcesSinks = () => (
  <SectionWrapper title="The planet cannot absorb our carbon fast enough" className="bg-neutral-700 text-white">
    <p className="mb-6 max-w-3xl text-sm leading-6 text-neutral-200 md:text-base">
      Carbon sources add CO2 to the air. Carbon sinks remove it. In 2023, nature absorbed less than half of human CO2 emissions. The rest stayed in the atmosphere, where it keeps heating the planet.
    </p>

    <div className="rounded-lg border border-danger/40 bg-danger/10 p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded bg-danger text-white">
            <AlertTriangle className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-danger-light">Carbon imbalance alert</p>
            <h3 className="text-2xl font-bold text-white md:text-3xl">Only {sinkPercent}% was absorbed</h3>
          </div>
        </div>
        <p className="max-w-md text-sm leading-6 text-neutral-200">
          About {gapGtCO2.toFixed(1)} GtCO2, more than half of human emissions, remained in the atmosphere.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded bg-neutral-900 ring-1 ring-white/10">
        <div className="flex h-14 text-xs font-bold uppercase tracking-wide text-white">
          <div className="flex items-center justify-center bg-primary-300 text-primary-600" style={{ width: `${sinkPercent}%` }}>
            Absorbed {sinkPercent}%
          </div>
          <div className="flex flex-1 items-center justify-center bg-danger text-white">
            Still in air {atmospherePercent}%
          </div>
        </div>
      </div>
    </div>

    <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr_0.9fr]">
      <div className="rounded-lg border border-danger/30 bg-white/5 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-danger/20 text-danger-light">
            <ArrowUpFromLine className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-danger-light">Carbon sources</p>
            <p className="text-sm text-neutral-300">Fossil fuels + land-use change</p>
          </div>
        </div>
        <p className="mt-5 text-4xl font-bold text-white">{carbonBudget.sourcesGtCO2} GtCO2</p>
        <p className="mt-1 text-sm text-neutral-300">released globally in 2023</p>
      </div>

      <div className="rounded-lg border border-primary-300/30 bg-white/5 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-300/20 text-primary-100">
            <ArrowDownToLine className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary-100">Carbon sinks</p>
            <p className="text-sm text-neutral-300">Ocean + land absorption</p>
          </div>
        </div>
        <p className="mt-5 text-4xl font-bold text-white">{carbonBudget.sinksGtCO2} GtCO2</p>
        <p className="mt-1 text-sm text-neutral-300">absorbed globally in 2023</p>
      </div>

      <div className="rounded-lg border border-warning/40 bg-warning/15 p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-warning">Atmospheric leftover</p>
        <p className="mt-3 text-3xl font-bold text-white">{gapGtCO2.toFixed(1)} GtCO2</p>
        <p className="mt-2 text-sm leading-6 text-neutral-200">
          This is the gap between emissions and what land plus ocean sinks could absorb.
        </p>
      </div>
    </div>

    <div className="mt-5 grid gap-3 md:grid-cols-3">
      <div className="rounded bg-white/5 p-4 text-sm ring-1 ring-white/10">
        <p className="font-bold text-white">Ocean sink</p>
        <p className="mt-1 text-neutral-300">{carbonBudget.oceanSinkGtCO2} GtCO2 absorbed</p>
      </div>
      <div className="rounded bg-white/5 p-4 text-sm ring-1 ring-white/10">
        <p className="font-bold text-white">Land sink</p>
        <p className="mt-1 text-neutral-300">{carbonBudget.landSinkGtCO2} GtCO2 absorbed</p>
      </div>
      <div className="rounded bg-white/5 p-4 text-sm ring-1 ring-white/10">
        <p className="font-bold text-white">Atmospheric increase</p>
        <p className="mt-1 text-neutral-300">{carbonBudget.atmosphereGtCO2} GtCO2 added</p>
      </div>
    </div>

    <p className="mt-5 text-xs leading-5 text-neutral-300">
      Source: Global Carbon Budget 2024. Values are rounded from 2023 budget components and converted from GtC to GtCO2.
    </p>
  </SectionWrapper>
);
