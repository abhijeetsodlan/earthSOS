"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const cards = [
  ["Climate change is just natural variation", "Current warming is dominated by human greenhouse gas emissions."],
  ["CO2 is plant food - more is better", "Plants need CO2, but heat, drought, fires, and nutrient limits damage ecosystems."],
  ["It's too late to do anything", "Every fraction of a degree avoided reduces harm."],
  ["Individual actions don't matter", "Personal choices can shift demand, norms, and policy support."],
  ["Renewable energy is unreliable", "Storage, grids, and diverse clean sources already support reliable power."],
  ["Planting trees alone will fix it", "Trees help, but emissions cuts and ecosystem protection are essential."]
];

export const MythsVsFacts = () => {
  const [flipped, setFlipped] = useState<number[]>([]);
  const toggle = (index: number) => setFlipped((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]);
  return (
    <SectionWrapper title="Myths vs facts" className="bg-neutral-100">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(([myth, fact], index) => (
          <button
            key={myth}
            type="button"
            aria-label={flipped.includes(index) ? `Show myth: ${myth}` : `Show fact for myth: ${myth}`}
            className="group relative min-h-44 rounded text-left [perspective:1000px] focus:outline-none"
            onClick={() => toggle(index)}
          >
            <span className="absolute -right-1 top-5 z-0 rounded-r bg-primary-400 px-2 py-1 text-[10px] font-bold uppercase tracking-normal text-white shadow-sm transition group-hover:translate-x-1 md:hidden">
              Fact
            </span>
            <motion.div
              className="relative z-10 h-44 overflow-hidden rounded bg-white p-5 shadow-sm ring-1 ring-neutral-200 transition group-active:scale-[0.99] group-focus-visible:ring-2 group-focus-visible:ring-primary-300 md:group-hover:-translate-y-0.5 md:group-hover:shadow-md [transform-style:preserve-3d]"
              animate={{ rotateY: flipped.includes(index) ? 180 : 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 p-5 [backface-visibility:hidden]">
                <p className="text-sm font-bold uppercase text-danger">Myth</p>
                <p className="mt-3 font-semibold text-neutral-700">{myth}</p>
                <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-500 shadow-sm transition group-active:rotate-45 md:opacity-70 md:group-hover:opacity-100">
                  <RotateCw className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <div className="absolute inset-0 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="text-sm font-bold uppercase text-primary-400">Fact</p>
                <p className="mt-3 font-semibold text-neutral-700">{fact}</p>
                <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-primary-100 bg-primary-50 text-primary-400 shadow-sm">
                  <RotateCw className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          </button>
        ))}
      </div>
    </SectionWrapper>
  );
};
