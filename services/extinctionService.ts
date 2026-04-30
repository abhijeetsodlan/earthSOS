import api from "./api";
import type { ExtinctSpecies } from "@/types/extinction";

interface ExtinctionApiResponse {
  success: boolean;
  data: ExtinctSpecies[];
  error?: string;
}

export const getExtinctSpecies = async (): Promise<ExtinctSpecies[]> => {
  const { data } = await api.get<ExtinctionApiResponse>("/extinction");
  return data.success ? data.data : [];
};
