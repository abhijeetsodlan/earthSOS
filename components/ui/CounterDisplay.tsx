"use client";

import { useCounter } from "@/hooks/useCounter";
import { formatNumber } from "@/lib/utils";

interface CounterDisplayProps {
  value: number;
  suffix?: string;
  enabled?: boolean;
  decimals?: number;
}

export const CounterDisplay = ({ value, suffix = "", enabled = true, decimals = 0 }: CounterDisplayProps) => {
  const count = useCounter(value, 1300, enabled);
  return (
    <span>
      {formatNumber(count, decimals)}
      {suffix}
    </span>
  );
};
