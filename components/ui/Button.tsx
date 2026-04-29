import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

export const Button = ({ variant = "primary", className, children, ...props }: ButtonProps) => {
  const variants = {
    primary: "bg-primary-300 text-white hover:bg-primary-400",
    secondary: "bg-secondary-300 text-white hover:bg-secondary-400",
    ghost: "border border-primary-200 text-primary-100 hover:bg-primary-500/40"
  };

  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
