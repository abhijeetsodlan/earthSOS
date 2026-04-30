import type { EarthLocation } from "@/types/extinction";

export const earthLocations: EarthLocation[] = [
  {
    id: "amazon-rainforest",
    name: "Amazon Rainforest, Brazil",
    category: "forest",
    coordinates: { lat: -9.19, lng: -62.85 },
    beforeYear: 1984,
    afterYear: 2024,
    beforeImageUrl: "https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/woc/images/amazon/amazon_deforestation_20000730.jpg?crop=faces%2Cfocalpoint&fit=clip&h=720&w=1080",
    afterImageUrl: "https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/woc/images/amazon/amazon_deforestation_20120718.jpg?crop=faces%2Cfocalpoint&fit=clip&h=720&w=1080",
    beforeLabel: "1984 - dense rainforest",
    afterLabel: "2024 - expanding clearings",
    stat: "Lost over 17% of original forest cover",
    description: "Roads and cattle pasture pushed deep into once-continuous rainforest, fragmenting habitat across the basin."
  }
];
