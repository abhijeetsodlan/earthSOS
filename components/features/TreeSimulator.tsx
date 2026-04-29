"use client";

import { useState } from "react";
import { TreePine } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const TreeSimulator = () => {
  const [trees, setTrees] = useState(25);
  const co2 = trees * 22;
  return (
    <SectionWrapper eyebrow="Tree impact" title="See what planting can do">
      <Card className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-center">
        <div>
          <TreePine className="mb-4 h-10 w-10 text-primary-300" aria-hidden />
          <label className="grid gap-4 font-semibold">
            Trees planted: {trees}
            <input className="slider-thumb h-3 w-full appearance-none rounded-full bg-neutral-200" type="range" min="1" max="500" value={trees} onChange={(event) => setTrees(Number(event.target.value))} />
          </label>
        </div>
        <div className="grid gap-3">
          <p className="text-3xl font-bold text-primary-500">{co2.toLocaleString("en-US")} kg CO2/year</p>
          <p className="text-neutral-600">Estimated annual carbon uptake, using 22 kg per mature tree as a simple education estimate.</p>
          <p className="text-xl font-semibold text-neutral-700">{(co2 * 20 / 1000).toFixed(1)} tonnes over 20 years</p>
        </div>
      </Card>
    </SectionWrapper>
  );
};
