// src/hooks/useDresses.ts
import useSWR from "swr";
import { supabase } from "@/lib/supabaseClient";

export type Dress = {
  collection_id: string;
  name: string;
  cost: number;
  image?: string;
  description?: string;
};

const fetcher = async () => {
  const { data, error } = await supabase
    .from("collections")
    .select("collection_id, name, cost, image, description")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
};

export function useCollections() {
  const { data, error } = useSWR("collections", fetcher, {
    revalidateOnFocus: false,
  });
  return {
    collections: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
}
