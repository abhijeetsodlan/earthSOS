import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export const Badge = ({ children, className }: BadgeProps) => (
  <span className={cn("inline-flex rounded-full border border-primary-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-300", className)}>
    {children}
  </span>
);
