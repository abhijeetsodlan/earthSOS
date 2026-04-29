"use client";

import { useEffect, useRef, useState } from "react";

type CounterScope = "year" | "day";

const formatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0
});

const getElapsedSeconds = (scope: CounterScope) => {
  const now = new Date();
  const start =
    scope === "year"
      ? new Date(now.getFullYear(), 0, 1, 0, 0, 0)
      : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

  return Math.max(0, (now.getTime() - start.getTime()) / 1000);
};

export const useLiveCounter = (ratePerSecond: number, intervalMs: number, scope: CounterScope) => {
  const countRef = useRef(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const initial = Math.floor(getElapsedSeconds(scope) * ratePerSecond);
    countRef.current = initial;
    setCount(initial);

    const increment = ratePerSecond * (intervalMs / 1000);
    const interval = window.setInterval(() => {
      countRef.current += increment;
      setCount(Math.floor(countRef.current));
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs, ratePerSecond, scope]);

  return {
    count,
    formatted: formatter.format(count)
  };
};
