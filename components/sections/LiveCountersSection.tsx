"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, TreeDeciduous, Wind } from "lucide-react";
import { useMemo } from "react";
import type { ReactNode } from "react";
import { useLiveCounter } from "@/hooks/useLiveCounter";

const SPECIES_PER_DAY = 150;
const SPECIES_TODAY_RATE = SPECIES_PER_DAY / 86_400;

export const LiveCountersSection = () => {
  const treesCutDown = useLiveCounter(475.65, 200, "year");
  const co2Emitted = useLiveCounter(1172.9, 100, "year");
  const speciesLost = useLiveCounter(SPECIES_TODAY_RATE, 1000, "day");
  const speciesLostThisYear = useLiveCounter(SPECIES_PER_DAY, 1000, "year");

  const coalPlantEquivalent = Math.floor(co2Emitted.count / 3_500_000);
  const speciesProgressClassName = useMemo(() => {
    const progress = Math.min((speciesLost.count / SPECIES_PER_DAY) * 100, 100);
    const bucket = Math.min(Math.max(Math.floor(progress / 10) * 10, 0), 100);
    const widths: Record<number, string> = {
      0: "w-0",
      10: "w-[10%]",
      20: "w-[20%]",
      30: "w-[30%]",
      40: "w-[40%]",
      50: "w-[50%]",
      60: "w-[60%]",
      70: "w-[70%]",
      80: "w-[80%]",
      90: "w-[90%]",
      100: "w-full"
    };
    return widths[bucket];
  }, [speciesLost.count]);

  return (
    <section className="bg-primary-600 px-4 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-100">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
            happening right now
          </div>
          <h2 className="font-display text-4xl font-bold text-white md:text-6xl">Earth is changing as you read this</h2>
          <p className="mt-5 text-base leading-7 text-primary-100 md:text-lg">
            These numbers update every second based on global scientific data.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <CounterCard
            icon={<TreeDeciduous className="h-8 w-8 text-red-400" aria-hidden="true" />}
            label="TREES CUT DOWN THIS YEAR"
            value={treesCutDown.formatted}
            valueClassName="text-red-400"
            unit="trees"
            source="Source: Global Forest Watch, 2024"
            updateKey={treesCutDown.count}
          />

          <CounterCard
            icon={<Wind className="h-8 w-8 text-orange-400" aria-hidden="true" />}
            label="CO2 EMITTED THIS YEAR"
            value={co2Emitted.formatted}
            valueClassName="text-orange-400"
            unit="tonnes of CO2"
            source="Source: Global Carbon Project"
            updateKey={co2Emitted.count}
          >
            <p className="mt-4 text-sm leading-6 text-primary-100">
              = {new Intl.NumberFormat("en-IN").format(coalPlantEquivalent)} coal power plants running for a year
            </p>
          </CounterCard>

          <CounterCard
            icon={<Leaf className="h-8 w-8 text-yellow-400" aria-hidden="true" />}
            label="SPECIES LOST TODAY"
            value={speciesLost.formatted}
            valueClassName="text-yellow-400"
            unit="species lost today"
            source="estimated based on IUCN data - 150 species/day"
            updateKey={speciesLost.count}
          >
            <div className="mt-4 rounded bg-primary-500/50 p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-primary-200">Lost this year</p>
              <p className="mt-1 font-display text-2xl font-bold leading-none text-yellow-400">
                <span aria-live="off">{speciesLostThisYear.formatted}</span>
              </p>
              <p className="mt-1 text-xs text-primary-100">estimated species</p>
            </div>
            <div className="mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-primary-500">
                <div className={`h-full rounded-full bg-primary-300 transition-all duration-500 ${speciesProgressClassName}`} />
              </div>
            </div>
            <Link
              href="/last-seen"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-primary-600 transition hover:bg-primary-100"
            >
              View lost species
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </CounterCard>
        </div>

        <p className="mx-auto mt-10 max-w-4xl text-center text-xs leading-6 text-primary-300 md:text-sm">
          Figures are estimates based on annual averages from peer-reviewed sources. Actual values may vary. Sources:
          FAO, IPCC, IUCN, Global Carbon Project.
        </p>
      </div>
    </section>
  );
};

interface CounterCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  valueClassName: string;
  unit: string;
  source: string;
  updateKey: number;
  children?: ReactNode;
}

const CounterCard = ({ icon, label, value, valueClassName, unit, source, updateKey, children }: CounterCardProps) => {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      {icon}
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-primary-200">{label}</p>
      <motion.div
        key={updateKey}
        initial={{ scale: 0.985 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className={`mt-3 max-w-full overflow-x-auto overflow-y-hidden pb-1 font-display text-[clamp(1.85rem,9vw,2.75rem)] font-bold leading-none tracking-normal md:text-[clamp(2.25rem,4.4vw,3rem)] lg:text-[clamp(2.25rem,2.75vw,2.8rem)] ${valueClassName}`}
      >
        <span className="block min-w-0 whitespace-nowrap tabular-nums" aria-live="off">
          {value}
        </span>
      </motion.div>
      <p className="mt-3 text-sm text-primary-100">{unit}</p>
      {children}
      <p className="mt-6 text-xs leading-5 text-primary-300">{source}</p>
    </div>
  );
};
