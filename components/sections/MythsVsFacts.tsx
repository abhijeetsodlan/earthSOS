"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
            className="group min-h-44 text-left [perspective:1000px]"
            onClick={() => toggle(index)}
          >
            <motion.div
              className="relative h-44 rounded bg-white p-5 shadow-sm ring-1 ring-neutral-200 transition group-focus-visible:ring-2 group-focus-visible:ring-primary-300"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: flipped.includes(index) ? 180 : 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 p-5" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                <p className="text-sm font-bold uppercase text-danger">Myth</p>
                <p className="mt-3 font-semibold text-neutral-700">{myth}</p>
                <p className="absolute bottom-4 left-5 rounded bg-neutral-100 px-2 py-1 text-[10px] font-bold uppercase text-neutral-500 md:hidden">Tap for fact</p>
              </div>
              <div className="absolute inset-0 p-5" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <p className="text-sm font-bold uppercase text-primary-400">Fact</p>
                <p className="mt-3 font-semibold text-neutral-700">{fact}</p>
                <p className="absolute bottom-4 left-5 rounded bg-primary-50 px-2 py-1 text-[10px] font-bold uppercase text-primary-400 md:hidden">Tap for myth</p>
              </div>
            </motion.div>
          </button>
        ))}
      </div>
    </SectionWrapper>
  );
};
