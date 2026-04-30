"use client";

import { motion } from "framer-motion";
import { Satellite } from "lucide-react";
import { earthLocations } from "@/data/earthLocations";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BeforeAfterEarth } from "@/components/features/BeforeAfterEarth";

export const EarthTimeMachine = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const selected = earthLocations[0];

  return (
    <section ref={ref} className="bg-primary-600 px-4 py-16 md:px-8 md:py-24">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 36 }}
        animate={isVisible ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-100">
              <Satellite className="h-4 w-4" aria-hidden />
              satellite imagery
            </div>
            <h2 className="mt-5 font-display text-5xl text-white md:text-7xl">Amazon: Then &amp; Now</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-primary-100 md:text-lg">
              40 years of change captured from space. Drag the slider to reveal what we&apos;ve lost.
            </p>
        </div>

        {selected ? (
          <div className="mt-10">
            <BeforeAfterEarth
              beforeImageUrl={selected.beforeImageUrl}
              afterImageUrl={selected.afterImageUrl}
              beforeYear={selected.beforeYear}
              afterYear={selected.afterYear}
              beforeLabel={selected.beforeLabel}
              afterLabel={selected.afterLabel}
            />
            <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <div>
                <h3 className="font-display text-2xl text-white">{selected.name}</h3>
                <p className="mt-1 text-base font-semibold text-primary-100">{selected.stat}</p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-primary-200">{selected.description}</p>
              </div>
              <a
                href="https://earthobservatory.nasa.gov/world-of-change"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-primary-200 transition hover:text-white"
              >
                View on NASA Earth Observatory -&gt;
              </a>
            </div>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
};
