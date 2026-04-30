"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getExtinctSpecies } from "@/services/extinctionService";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { ExtinctSpecies } from "@/types/extinction";
import { ExtinctionCard, ExtinctionCardSkeleton } from "@/components/features/ExtinctionCard";

const filters = ["All", "Forest", "Ocean", "Island", "Unknown"] as const;
type Filter = typeof filters[number];

interface Props {
  showPageLink?: boolean;
  infiniteScroll?: boolean;
}

const getHabitat = (region: string): Filter => {
  const lower = region.toLowerCase();
  if (lower.includes("island") || lower.includes("mauritius") || lower.includes("hawaii")) {
    return "Island";
  }
  if (lower.includes("ocean") || lower.includes("sea") || lower.includes("marine")) {
    return "Ocean";
  }
  if (lower.includes("forest") || lower.includes("woodland") || lower.includes("rainforest")) {
    return "Forest";
  }
  return "Unknown";
};

export const LastSeenSection = ({ showPageLink = true, infiniteScroll = false }: Props) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [species, setSpecies] = useState<ExtinctSpecies[]>([]);
  const [filter, setFilter] = useState<Filter>("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    getExtinctSpecies()
      .then((items) => {
        setSpecies(items);
        setError(items.length === 0);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const filteredSpecies = useMemo(() => (
    filter === "All" ? species : species.filter((item) => getHabitat(item.region) === filter)
  ), [filter, species]);

  const visibleSpecies = filteredSpecies.slice(0, visibleCount);

  useEffect(() => {
    if (!infiniteScroll || !loadMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setVisibleCount((count) => Math.min(count + 6, filteredSpecies.length));
      }
    }, { rootMargin: "260px" });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredSpecies.length, infiniteScroll]);

  return (
    <section id="lost-species-gallery" ref={ref} className="bg-neutral-50 px-4 py-16 md:px-8 md:py-24">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 32 }}
        animate={isVisible ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-neutral-700" />
            species lost forever
          </div>
          <h2 className="mt-5 font-display text-5xl italic text-neutral-700 md:text-7xl">
            {showPageLink ? "Last Seen" : "The Lost Species Gallery"}
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-500 md:text-lg">
            These species existed for millions of years. We lost them in decades. Once gone, they&apos;re gone forever.
          </p>
          {showPageLink && (
            <Link
              href="/last-seen"
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-neutral-700 px-6 text-sm font-semibold text-white transition hover:bg-primary-600"
            >
              Open Last Seen gallery
            </Link>
          )}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition ${filter === item ? "border-primary-300 bg-primary-300 text-white" : "border-neutral-200 bg-white text-neutral-500 hover:border-primary-200"}`}
              onClick={() => {
                setFilter(item);
                setVisibleCount(6);
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {loading && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => <ExtinctionCardSkeleton key={index} />)}
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-sm">
            <p className="text-sm text-neutral-500">Could not load extinction data. Try refreshing.</p>
            <button type="button" className="mt-4 min-h-11 rounded-full bg-primary-300 px-5 text-sm font-semibold text-white" onClick={load}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredSpecies.length === 0 && (
          <p className="mt-10 text-center text-sm text-neutral-500">No species match this habitat filter.</p>
        )}

        {!loading && !error && (
          <>
            <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {visibleSpecies.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ExtinctionCard species={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {!infiniteScroll && visibleCount < filteredSpecies.length && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  className="min-h-11 rounded-full bg-neutral-700 px-6 text-sm font-semibold text-white transition hover:bg-primary-600"
                  onClick={() => setVisibleCount((count) => count + 6)}
                >
                  Load more
                </button>
              </div>
            )}
            {infiniteScroll && visibleCount < filteredSpecies.length && (
              <div ref={loadMoreRef} className="mt-10 flex justify-center">
                <div className="h-10 w-10 animate-pulse rounded-full border-2 border-primary-300 border-t-transparent" />
              </div>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
};
