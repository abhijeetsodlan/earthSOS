import Image from "next/image";
import type { TreeEntry } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface TreeCardProps {
  tree: TreeEntry;
}

export const TreeCard = ({ tree }: TreeCardProps) => (
  <Card>
    <div className="relative mb-4 h-36 overflow-hidden rounded bg-primary-50">
      <Image src={tree.image} alt={`${tree.name} forest habitat`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
    </div>
    <Badge>{tree.region}</Badge>
    <h2 className="mt-3 text-xl font-bold text-neutral-700">{tree.name}</h2>
    <p className="text-sm italic text-neutral-500">{tree.scientificName}</p>
    <p className="mt-3 text-sm text-neutral-600">{tree.description}</p>
    <p className="mt-4 text-sm font-semibold text-primary-500">{tree.carbonKgPerYear} kg CO2/year • {tree.lifespanYears} year lifespan</p>
  </Card>
);
