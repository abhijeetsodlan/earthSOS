"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ExtinctSpecies } from "@/types/extinction";

interface Props {
  species: ExtinctSpecies;
}

const FallbackSilhouette = () => (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-neutral-700">
    <svg className="h-24 w-24 text-primary-100/70" viewBox="0 0 120 120" role="img" aria-label="Extinct species illustration">
      <path
        d="M25 69c3-18 18-31 39-31 14 0 27 6 33 17 8 1 14 6 16 13-9 0-15 3-20 9-6 8-16 13-29 13-16 0-29-7-36-18l-15 6 4-12 8 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M70 51h.1M39 82l-8 14M55 88l-3 16" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  </div>
);

export const ExtinctionCard = ({ species }: Props) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = Boolean(species.photoUrl) && !imageFailed;

  return (
    <motion.article
      className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
      whileHover={{ scale: 1.02, boxShadow: "0 18px 45px rgb(44 44 42 / 0.14)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {showPhoto ? (
          <Image
            src={species.photoUrl ?? ""}
            alt={`${species.commonName} (${species.name})`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            unoptimized
            onError={() => setImageFailed(true)}
          />
        ) : (
          <FallbackSilhouette />
        )}
        {species.photoCredit && showPhoto && (
          <p className="absolute bottom-2 left-3 rounded-full bg-black/25 px-2 py-1 text-[10px] text-white/70 backdrop-blur">
            {species.photoCredit}
          </p>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-neutral-700">{species.commonName}</h3>
        <p className="mb-2 text-xs italic text-neutral-400">{species.name}</p>
        <span className={`inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold ${species.lastSeenYear ?? species.extinctionYear ? "bg-warning-light text-warning-dark" : "bg-danger-light text-danger-dark"}`}>
          {species.lastSeenYear ?? species.extinctionYear ? `Last seen ${species.lastSeenYear ?? species.extinctionYear}` : "Extinct"}
        </span>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-500">{species.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {species.mainThreats.slice(0, 2).map((threat) => (
            <span key={threat} className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-500">
              {threat}
            </span>
          ))}
        </div>
        <a
          href={species.iucnUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary-300 transition hover:text-primary-400"
        >
          Read source -&gt;
        </a>
      </div>
    </motion.article>
  );
};

export const ExtinctionCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
    <div className="aspect-[4/3] animate-pulse bg-neutral-700" />
    <div className="space-y-3 p-4">
      <div className="h-5 w-2/3 animate-pulse rounded bg-neutral-100" />
      <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-100" />
      <div className="h-7 w-24 animate-pulse rounded-full bg-neutral-100" />
      <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-neutral-100" />
    </div>
  </div>
);
