import type { TreeEntry } from "@/types";

export const treeData: TreeEntry[] = [
  {
    id: "oak",
    name: "Oak",
    scientificName: "Quercus",
    region: "Temperate forests",
    carbonKgPerYear: 22,
    lifespanYears: 200,
    description: "A resilient canopy tree that supports birds, insects, fungi, and long-term soil carbon.",
    image: "/images/forest.svg"
  },
  {
    id: "mangrove",
    name: "Mangrove",
    scientificName: "Rhizophora mangle",
    region: "Coastal tropics",
    carbonKgPerYear: 30,
    lifespanYears: 100,
    description: "Coastal tree systems that protect shorelines and store dense blue carbon in wet soils.",
    image: "/images/forest.svg"
  },
  {
    id: "neem",
    name: "Neem",
    scientificName: "Azadirachta indica",
    region: "South Asia",
    carbonKgPerYear: 18,
    lifespanYears: 150,
    description: "A drought-tolerant shade tree valued for urban cooling and community planting.",
    image: "/images/forest.svg"
  },
  {
    id: "redwood",
    name: "Coast Redwood",
    scientificName: "Sequoia sempervirens",
    region: "Pacific coast",
    carbonKgPerYear: 45,
    lifespanYears: 1000,
    description: "A towering conifer that can store exceptional amounts of carbon over centuries.",
    image: "/images/forest.svg"
  }
];
