"use client";

import { useMemo, useState } from "react";
import type { CarbonBreakdown, CarbonInputs } from "@/types";

const initialInputs: CarbonInputs = {
  kmDrivenPerWeek: 120,
  publicTransitKmPerWeek: 40,
  bikeKmPerWeek: 20,
  shortFlightsPerYear: 1,
  longFlightsPerYear: 0,
  electricityKwhPerMonth: 250,
  householdSize: 3,
  heatingType: "gas",
  renewableElectricity: "none",
  dietType: "omnivore",
  shoppingFrequency: "monthly",
  wasteLevel: "average"
};

const dietTonnes: Record<CarbonInputs["dietType"], number> = {
  vegan: 1.0,
  vegetarian: 1.5,
  omnivore: 2.3,
  "heavy-meat": 3.3
};

const shoppingTonnes: Record<CarbonInputs["shoppingFrequency"], number> = {
  rarely: 0.3,
  monthly: 0.8,
  weekly: 1.6
};

const heatingTonnes: Record<CarbonInputs["heatingType"], number> = {
  gas: 1.4,
  electric: 0.7,
  none: 0
};

const renewableMultiplier: Record<CarbonInputs["renewableElectricity"], number> = {
  none: 1,
  partial: 0.65,
  mostly: 0.25
};

const wasteTonnes: Record<CarbonInputs["wasteLevel"], number> = {
  low: 0.2,
  average: 0.45,
  high: 0.8
};

export const useCarbonCalc = () => {
  const [inputs, setInputs] = useState<CarbonInputs>(initialInputs);

  const results = useMemo(() => {
    const householdSize = Math.max(inputs.householdSize, 1);
    const transport = (
      inputs.kmDrivenPerWeek * 52 * 0.000192 +
      inputs.publicTransitKmPerWeek * 52 * 0.000089 +
      inputs.bikeKmPerWeek * 52 * 0.000021 +
      inputs.shortFlightsPerYear * 0.28 +
      inputs.longFlightsPerYear * 1.6
    );
    const electricity = inputs.electricityKwhPerMonth * 12 * 0.00035 * renewableMultiplier[inputs.renewableElectricity];
    const home = (electricity + heatingTonnes[inputs.heatingType]) / householdSize;
    const food = dietTonnes[inputs.dietType];
    const shopping = shoppingTonnes[inputs.shoppingFrequency] + wasteTonnes[inputs.wasteLevel];
    const breakdown: CarbonBreakdown[] = [
      { name: "Transport", value: transport },
      { name: "Home", value: home },
      { name: "Food", value: food },
      { name: "Shopping", value: shopping }
    ];
    const total = breakdown.reduce((sum, item) => sum + item.value, 0);
    const matureTreesNeeded = Math.ceil((total * 1000) / 22);

    return {
      total,
      comparison: total / 4.7,
      breakdown,
      matureTreesNeeded
    };
  }, [inputs]);

  return { inputs, setInputs, results };
};
