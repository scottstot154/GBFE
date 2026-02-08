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
      let response: { data: unknown; error: { message: string } | null } = {
        data: null,
        error: null,
      };

      if (action === "select") {
        response = await supabase.from(table).select("*");
      }
      if (action === "insert") {
        response = await supabase.from(table).insert(values);
      }
      if (action === "update") {
        response = await supabase.from(table).update(values).match(match || {});
      }
      if (action === "delete") {
        response = await supabase.from(table).delete().match(match || {});
      }

      const { data, error } = response;
      if (error) return { error: { message: error.message } };

      return { data };
    } catch (e: any) {
      return { error: { message: e.message } };
    }
  };
