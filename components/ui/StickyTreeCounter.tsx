"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Sprout, TreeDeciduous } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useLiveCounter } from "@/hooks/useLiveCounter";

export const StickyTreeCounter = () => {
  const [collapsed, setCollapsed] = useState(false);
  const treesCut = useLiveCounter(475.65, 200, "day");
  const treesPlanted = useLiveCounter(57.08, 500, "day");

  return (
    <motion.aside
      aria-label="Live tree counter widget"
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.45, ease: "easeOut" }}
      className="fixed right-3 top-[72px] z-40 w-auto min-w-40 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm md:right-6 md:top-20 md:min-w-[200px]"
    >
      <button
        type="button"
        aria-label={collapsed ? "Expand tree counter" : "Collapse tree counter"}
        onClick={() => setCollapsed((value) => !value)}
        className="absolute right-2 top-2 rounded-full p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-300"
      >
        {collapsed ? <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> : <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />}
      </button>

      {collapsed ? (
        <div className="flex items-center gap-2 pr-5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary-300" />
        </div>
      ) : (
        <div className="space-y-2 pr-4">
          <CounterRow
            icon={<TreeDeciduous className="h-4 w-4 text-red-500" aria-hidden="true" />}
            label="Trees cut today"
            value={treesCut.formatted}
            valueClassName="text-red-500"
          />
          <div className="border-t border-neutral-100" />
          <CounterRow
            icon={<Sprout className="h-4 w-4 text-primary-300" aria-hidden="true" />}
            label="Trees planted today"
            value={treesPlanted.formatted}
            valueClassName="text-primary-300"
          />
          <p className="text-center text-[9px] leading-none text-neutral-500">live estimates</p>
        </div>
      )}
    </motion.aside>
  );
};

interface CounterRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  valueClassName: string;
}

const CounterRow = ({ icon, label, value, valueClassName }: CounterRowProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-50">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase leading-none text-neutral-500">{label}</p>
        <p className={`mt-1 text-sm font-bold leading-none ${valueClassName}`}>
          <span aria-live="off">{value}</span>
        </p>
      </div>
    </div>
  );
};
