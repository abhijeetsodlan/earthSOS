"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const SpeciesCounter = () => {
  const [loss, setLoss] = useState(1000000);
  useEffect(() => {
    const timer = window.setInterval(() => setLoss((value) => value + 1), 4500);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <SectionWrapper title="Species risk is rising in real time">
      <Card className="bg-danger-light">
        <p className="text-4xl font-bold text-danger-dark">{loss.toLocaleString("en-US")}+</p>
        <p className="mt-2 text-neutral-700">Species are threatened with extinction as habitats warm, dry, burn, and fragment.</p>
      </Card>
    </SectionWrapper>
  );
};
