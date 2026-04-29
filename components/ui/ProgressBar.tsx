"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  label: string;
  tone?: "primary" | "danger" | "secondary";
}

export const ProgressBar = ({ value, label, tone = "primary" }: ProgressBarProps) => {
  const colors = {
    primary: "bg-primary-300",
    danger: "bg-danger",
    secondary: "bg-secondary-300"
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm font-semibold text-neutral-700">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
        <motion.div
          className={`h-full ${colors[tone]}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};
