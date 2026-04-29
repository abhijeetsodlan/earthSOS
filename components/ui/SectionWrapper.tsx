"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export const SectionWrapper = ({ id, title, eyebrow, children, className }: SectionWrapperProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id={id} ref={ref} className={cn("px-4 py-12 md:px-8 md:py-20", className)}>
      <div className="mx-auto max-w-6xl">
        {(title || eyebrow) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6 }}
            className="mb-8 max-w-3xl"
          >
            {eyebrow && <p className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-400">{eyebrow}</p>}
            {title && <h2 className="text-2xl font-bold text-neutral-700 md:text-4xl">{title}</h2>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};
