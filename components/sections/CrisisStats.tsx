"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { CounterDisplay } from "@/components/ui/CounterDisplay";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: 1.2, suffix: "C", label: "Average warming since pre-industrial era", decimals: 1, prefix: "+" },
  { value: 15, suffix: " billion", label: "Trees cut down every year", decimals: 0, prefix: "" },
  { value: 1, suffix: " million+", label: "Species threatened with extinction", decimals: 0, prefix: "" },
  { value: 13, suffix: "%", label: "Arctic sea ice lost per decade", decimals: 0, prefix: "-" }
];

export const CrisisStats = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <SectionWrapper id="crisis" eyebrow="Crisis signals" title="The numbers are already moving">
      <div ref={ref} className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 24 }} animate={isVisible ? { opacity: 1, y: 0 } : undefined} transition={{ delay: index * 0.12 }}>
            <Card className="h-full">
              <p className="text-3xl font-bold text-primary-500">{stat.prefix}<CounterDisplay value={stat.value} suffix={stat.suffix} enabled={isVisible} decimals={stat.decimals} /></p>
              <p className="mt-3 text-sm text-neutral-600">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
