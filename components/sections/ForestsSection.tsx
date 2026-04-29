import { Droplets, Leaf, Shield } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const cards = [
  { title: "Carbon Sinks", text: "Forests store carbon in trunks, roots, leaves, and soils.", Icon: Leaf },
  { title: "Water Cycle", text: "Tree cover cools landscapes and helps regulate rainfall.", Icon: Droplets },
  { title: "Biodiversity", text: "Forest habitats shelter most of the planet's land species.", Icon: Shield }
];

export const ForestsSection = () => (
  <SectionWrapper id="forests" eyebrow="Forests" title="Trees are climate infrastructure">
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map(({ title, text, Icon }) => (
        <Card key={title}>
          <Icon className="mb-4 h-9 w-9 text-primary-300" aria-hidden />
          <h3 className="text-xl font-bold text-neutral-700">{title}</h3>
          <p className="mt-2 text-sm text-neutral-600">{text}</p>
        </Card>
      ))}
    </div>
    <Card className="mt-6 grid gap-5">
      <ProgressBar label="Amazon deforestation lost" value={17} tone="danger" />
      <ProgressBar label="Global forest cover remaining" value={68} tone="primary" />
    </Card>
  </SectionWrapper>
);
