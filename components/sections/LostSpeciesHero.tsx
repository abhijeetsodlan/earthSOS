"use client";

import { motion } from "framer-motion";
import { ArrowDown, Skull } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const LostSpeciesHero = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-neutral-700 px-4 pb-16 pt-28 text-white md:px-8 md:pb-24 md:pt-32">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(23,52,4,0.92),rgba(44,44,42,0.96)),url('https://hips.hearstapps.com/hmg-prod/images/now-extinct-tasmanian-tiger-in-hobart-zoo-tasmania-news-photo-1607465288.?crop=1xw:1xh;center,top')]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(239,159,39,0.16),transparent_34%)]" />

      <motion.div
        className="relative mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 34 }}
        animate={isVisible ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-100 backdrop-blur">
            <Skull className="h-4 w-4" aria-hidden />
            archive of absence
          </div>
          <h1 className="mt-6 font-display text-6xl leading-none text-white md:text-8xl">Last Seen</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-100 md:text-2xl">
            A record of species that reached the edge of memory, then disappeared from the living world.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-neutral-200 md:text-base">
            Each card below is a small obituary: where it lived, what pressure ended it, and the last known year humans could still say it was here.
          </p>
        </div>

        <a
          href="#lost-species-gallery"
          className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-neutral-700 transition hover:bg-primary-100"
        >
          Enter the gallery
          <ArrowDown className="h-4 w-4" aria-hidden />
        </a>
      </motion.div>
    </section>
  );
};
