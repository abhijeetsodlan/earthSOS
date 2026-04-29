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
          <button key={myth} className="min-h-44 text-left [perspective:1000px]" onClick={() => toggle(index)}>
            <motion.div className="relative h-44 rounded bg-white p-5 shadow-sm ring-1 ring-neutral-200 [transform-style:preserve-3d]" animate={{ rotateY: flipped.includes(index) ? 180 : 0 }}>
              <div className="absolute inset-0 p-5 [backface-visibility:hidden]">
                <p className="text-sm font-bold uppercase text-danger">Myth</p>
                <p className="mt-3 font-semibold text-neutral-700">{myth}</p>
              </div>
              <div className="absolute inset-0 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="text-sm font-bold uppercase text-primary-400">Fact</p>
                <p className="mt-3 font-semibold text-neutral-700">{fact}</p>
              </div>
            </motion.div>
          </button>
        ))}
      </div>
    </SectionWrapper>
  );
};
