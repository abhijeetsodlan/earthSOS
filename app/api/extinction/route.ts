import { NextResponse } from "next/server";
import { extinctSpeciesFallback } from "@/data/extinctSpeciesFallback";
import type { ExtinctSpecies } from "@/types/extinction";

interface WikipediaPage {
  thumbnail?: { source?: string };
  terms?: { description?: string[] };
}

interface WikipediaResponse {
  query?: { pages?: Record<string, WikipediaPage> };
}

interface WikipediaPhoto {
  photoUrl: string | null;
  photoCredit: string | null;
}

let cache: { data: ExtinctSpecies[]; timestamp: number } | null = null;
const CACHE_TTL = 24 * 60 * 60 * 1000;

const fetchWikipediaPhoto = async (name: string): Promise<WikipediaPhoto> => {
  const params = new URLSearchParams({
    action: "query",
    titles: name,
    prop: "pageimages",
    format: "json",
    pithumbsize: "600",
    origin: "*"
  });

  const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`, {
    next: { revalidate: 60 * 60 * 24 }
  });

  if (!response.ok) {
    throw new Error("Wikipedia image request failed");
  }

  const payload = await response.json() as WikipediaResponse;
  const pages = payload.query?.pages;
  const page = pages ? Object.values(pages)[0] : undefined;
  const photoUrl = page?.thumbnail?.source ?? null;

  return {
    photoUrl,
    photoCredit: photoUrl ? "Wikipedia / Wikimedia Commons" : null
  };
};

const getPopularMechanicsSpecies = async () => {
  const photos = await Promise.allSettled(
    extinctSpeciesFallback.map((species) => fetchWikipediaPhoto(species.name))
  );

  return extinctSpeciesFallback.map<ExtinctSpecies>((species, index) => {
    const photo = photos[index].status === "fulfilled" ? photos[index].value : null;

    return {
      ...species,
      photoUrl: species.photoUrl ?? photo?.photoUrl ?? null,
      photoCredit: species.photoCredit ?? photo?.photoCredit ?? null
    };
  });
};

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({ success: true, data: cache.data, source: "popular-mechanics" });
  }

  try {
    const data = await getPopularMechanicsSpecies();
    cache = { data, timestamp: Date.now() };

    return NextResponse.json({ success: true, data, source: "popular-mechanics" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      source: "popular-mechanics",
      error: error instanceof Error ? error.message : "Could not load extinction data"
    });
  }
}
