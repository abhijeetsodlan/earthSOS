"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { climateService } from "@/services/climateService";
import { Badge } from "@/components/ui/Badge";

const stagger = {
  hidden: { opacity: 0, y: 24 },
  show: (index: number) => ({ opacity: 1, y: 0, transition: { delay: index * 0.15, duration: 0.6 } })
};

export const HeroSection = () => {
  const [ppm, setPpm] = useState(424.55);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    climateService.getCo2()
      .then((data) => setPpm(data.ppm))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setPpm((value) => value + 0.00003), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative -mt-16 flex min-h-screen items-center overflow-hidden bg-primary-600 px-4 pt-24 text-center text-white md:px-8 md:text-left">
      <div className="absolute inset-x-0 bottom-0 h-36 opacity-25" aria-hidden>
        <svg className="h-full w-full" viewBox="0 0 1200 180" preserveAspectRatio="none">
          <path fill="#97C459" d="M0 160h1200V80l-45 50-35-65-45 70-40-90-55 95-45-75-55 80-50-110-55 115-45-70-65 80-45-95-70 105-60-80-70 90-55-120-75 130-50-80-70 90-60-95-70 105-45-70-65 80-40-75-55 85-45-70-55 80z" />
        </svg>
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_380px] md:items-end">
        <div className="max-w-2xl">
          <motion.div variants={stagger} custom={0} initial="hidden" animate="show"><Badge>Climate awareness</Badge></motion.div>
          <motion.h1 variants={stagger} custom={1} initial="hidden" animate="show" className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            Our planet is sending an <span className="text-primary-200">S.O.S.</span>
          </motion.h1>
          <motion.p variants={stagger} custom={2} initial="hidden" animate="show" className="mx-auto mt-5 max-w-[480px] text-base text-neutral-200 md:mx-0 md:text-lg">
            Track the signals, understand the stakes, and turn climate awareness into practical action for forests, species, and communities.
          </motion.p>
          <motion.div variants={stagger} custom={3} initial="hidden" animate="show" className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link href="#crisis" className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-primary-300 px-5 py-3 font-bold text-white">
              Explore the crisis <ArrowDown className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/calculator" className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-primary-200 px-5 py-3 font-bold text-white transition hover:bg-primary-500">
              Calculate footprint <Calculator className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
        <motion.div variants={stagger} custom={4} initial="hidden" animate="show" className="rounded-lg border border-primary-300/40 bg-primary-500/70 p-5 text-left shadow-2xl">
          <p className="text-sm font-bold uppercase text-primary-200">Atmospheric CO2</p>
          {loading ? <div className="mt-4 h-12 animate-pulse rounded bg-primary-400" /> : <p className="mt-2 text-4xl font-bold">{ppm.toFixed(5)} ppm</p>}
          <p className="mt-2 text-danger">+{(ppm - 280).toFixed(2)} ppm vs pre-industrial</p>
          <p className="mt-3 text-sm leading-6 text-primary-100">
            PPM means parts per million: about how many CO2 molecules are in every million air molecules. The red number shows how much higher today&apos;s level is than the pre-industrial baseline of about 280 ppm.
          </p>
          <div className="mt-5 flex items-center gap-2 rounded border border-primary-300/40 bg-primary-600/40 px-4 py-3 text-sm font-semibold text-primary-100">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-200" aria-hidden />
            Live climate signal
          </div>
        </motion.div>
      </div>
    </section>
  );
};
