"use client";

import Link from "next/link";
import { treeData } from "@/data/treeData";
import { TreeCard } from "@/components/features/TreeCard";

export default function EncyclopediaPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-6 inline-flex min-h-11 items-center font-bold text-primary-400">Earth S.O.S.</Link>
        <h1 className="text-3xl font-bold text-neutral-700 md:text-4xl">Tree encyclopedia</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {treeData.map((tree) => <TreeCard key={tree.id} tree={tree} />)}
        </div>
      </div>
    </main>
  );
}
