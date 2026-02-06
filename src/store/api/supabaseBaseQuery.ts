// store/api/supabaseBaseQuery.ts
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { supabase } from "@/lib/supabaseClient";

type SupabaseArgs = {
  table: string;
  action: "select" | "insert" | "update" | "delete";
  match?: Record<string, any>;
  values?: Record<string, any>;
};

export const supabaseBaseQuery =
  (): BaseQueryFn<SupabaseArgs, unknown, { message: string }> =>
  async ({ table, action, match, values }) => {
    try {
      let query = supabase.from(table);

      if (action === "select") query = query.select("*");
      if (action === "insert") query = query.insert(values);
      if (action === "update") query = query.update(values).match(match || {});
      if (action === "delete") query = query.delete().match(match || {});

      const { data, error } = await query;
      if (error) return { error: { message: error.message } };

      return { data };
    } catch (e: any) {
      return { error: { message: e.message } };
    }
  };
