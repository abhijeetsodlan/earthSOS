import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => (
  <div className={cn("rounded bg-white p-5 shadow-sm ring-1 ring-neutral-200", className)} {...props}>
    {children}
  </div>
);
