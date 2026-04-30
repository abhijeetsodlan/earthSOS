"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, TreeDeciduous } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useLiveCounter } from "@/hooks/useLiveCounter";

export const StickyTreeCounter = () => {
  const [collapsed, setCollapsed] = useState(false);
  const treesCut = useLiveCounter(475.65, 200, "day");

  return (
    <motion.aside
      aria-label="Live tree counter widget"
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.45, ease: "easeOut" }}
      className="fixed bottom-4 right-3 z-40 w-auto rounded-full border border-neutral-200 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm md:bottom-auto md:right-6 md:top-20 md:min-w-[200px] md:rounded-2xl md:px-4 md:py-3"
    >
      <button
        type="button"
        aria-label={collapsed ? "Expand tree counter" : "Collapse tree counter"}
        onClick={() => setCollapsed((value) => !value)}
        className="absolute right-1.5 top-1.5 rounded-full p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-300 md:right-2 md:top-2"
      >
        {collapsed ? <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> : <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />}
      </button>

      {collapsed ? (
        <div className="flex items-center gap-2 pr-5 md:pr-5">
          <TreeDeciduous className="h-4 w-4 text-red-500" aria-hidden="true" />
          <span className="text-xs font-bold leading-none text-red-500 md:hidden">{treesCut.formatted}</span>
          <span className="hidden h-2.5 w-2.5 rounded-full bg-red-500 md:block" />
        </div>
      ) : (
        <div className="space-y-2 pr-4">
          <CounterRow
            icon={<TreeDeciduous className="h-4 w-4 text-red-500" aria-hidden="true" />}
            label="Trees cut today"
            value={treesCut.formatted}
            valueClassName="text-red-500"
          />
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
