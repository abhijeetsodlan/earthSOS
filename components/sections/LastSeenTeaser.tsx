"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Skull } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const LastSeenTeaser = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-neutral-50 px-4 py-14 md:px-8">
      <motion.div
        className="mx-auto grid max-w-7xl gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8"
        initial={{ opacity: 0, y: 26 }}
        animate={isVisible ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-danger-light text-danger">
            <Skull className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-danger">species lost forever</p>
            <h2 className="mt-2 font-display text-3xl text-neutral-700 md:text-4xl">Visit the Last Seen gallery</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500 md:text-base">
              A dedicated memorial for recently lost species, with a live extinction-impact counter.
            </p>
          </div>
        </div>

        <Link
          href="/last-seen"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-neutral-700 px-6 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          Open gallery
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </motion.div>
    </section>
  );
};
