export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Co2Reading {
  ppm: number;
  date: string;
}

export interface TemperaturePoint {
  year: number;
  anomaly: number;
}

export interface DeforestationCountry {
  id: string;
  name: string;
  forestLossPercent: number;
  annualLossHectares: number;
  risk: "low" | "medium" | "high";
}

export interface Pledge {
  id: string;
  name: string;
  pledge: string;
  country: string;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TreeEntry {
  id: string;
  name: string;
  scientificName: string;
  region: string;
  carbonKgPerYear: number;
  lifespanYears: number;
  description: string;
  image: string;
}

export interface CarbonInputs {
  kmDrivenPerWeek: number;
  publicTransitKmPerWeek: number;
  bikeKmPerWeek: number;
  shortFlightsPerYear: number;
  longFlightsPerYear: number;
  electricityKwhPerMonth: number;
  householdSize: number;
  heatingType: "gas" | "electric" | "none";
  renewableElectricity: "none" | "partial" | "mostly";
  dietType: "vegan" | "vegetarian" | "omnivore" | "heavy-meat";
  shoppingFrequency: "rarely" | "monthly" | "weekly";
  wasteLevel: "low" | "average" | "high";
}

export interface CarbonBreakdown {
  name: string;
  value: number;
}
