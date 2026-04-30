"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, CalendarDays, Clock3 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const KNOWN_EXTINCT_SPECIES = 902;
const ANNUAL_LOSS_ESTIMATE = 150;
const BASE_DATE = new Date("2026-01-01T00:00:00Z").getTime();
const YEAR_START = new Date("2026-01-01T00:00:00Z").getTime();
const YEAR_END = new Date("2027-01-01T00:00:00Z").getTime();

const formatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const decimalFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 });

export const ExtinctionPulseCounter = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const yearProgress = Math.min(1, Math.max(0, (now - YEAR_START) / (YEAR_END - YEAR_START)));
    const secondsReading = Math.max(0, (now - BASE_DATE) / 1000);
    const speciesThisYear = yearProgress * ANNUAL_LOSS_ESTIMATE;
    const speciesWhileReading = secondsReading * (ANNUAL_LOSS_ESTIMATE / (365 * 24 * 60 * 60));
    const dailyLoss = ANNUAL_LOSS_ESTIMATE / 365;

    return {
      knownExtinct: KNOWN_EXTINCT_SPECIES + Math.floor(speciesThisYear),
      thisYear: speciesThisYear,
      dailyLoss,
      whileReading: speciesWhileReading
    };
  }, [now]);

  return (
    <section ref={ref} className="bg-neutral-50 px-4 py-14 md:px-8">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 28 }}
        animate={isVisible ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-danger text-white">
              <Activity className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-neutral-400">Known extinct species</p>
            <p className="mt-2 font-display text-5xl text-neutral-700">{formatter.format(stats.knownExtinct)}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-warning text-neutral-700">
              <CalendarDays className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-neutral-400">Estimated this year</p>
            <p className="mt-2 font-display text-5xl text-neutral-700">{decimalFormatter.format(stats.thisYear)}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-300 text-white">
              <Clock3 className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-neutral-400">Estimated per day</p>
            <p className="mt-2 font-display text-5xl text-neutral-700">{decimalFormatter.format(stats.dailyLoss)}</p>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-4xl text-center text-lg leading-8 text-neutral-700 md:text-2xl">
          While you are reading this page, an estimated{" "}
          <span className="font-bold text-warning">{decimalFormatter.format(stats.whileReading)}</span>{" "}
          species-worth of life has moved closer to silence.
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-center text-xs leading-5 text-neutral-500">
          This is an educational estimate based on an annualized extinction-rate display, not a live verified registry of individual extinctions.
        </p>
      </motion.div>
    </section>
  );
};
