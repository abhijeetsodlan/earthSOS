export interface ExtinctSpecies {
  id: number;
  name: string;
  commonName: string;
  extinctionYear: number | null;
  lastSeenYear: number | null;
  mainThreats: string[];
  region: string;
  photoUrl: string | null;
  photoCredit: string | null;
  iucnUrl: string;
  description: string;
}

export interface EarthLocation {
  id: string;
  name: string;
  category: "forest" | "glacier" | "coastline" | "lake" | "city";
  coordinates: { lat: number; lng: number };
  beforeYear: number;
  afterYear: number;
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeLabel: string;
  afterLabel: string;
  stat: string;
  description: string;
}
