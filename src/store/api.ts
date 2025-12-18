// src/store/api.ts
import { supabase } from "@/utils/supabase";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { supabase } from './supabaseClient'; // or however you access supabase

const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1` || "/api";
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    // anon key — safe to include in client
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (anonKey) headers.set("apikey", anonKey);

    // If user is signed in, attach their JWT for auth-protected rows
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else if (anonKey) {
      // fallback to anon for public endpoints
      headers.set("Authorization", `Bearer ${anonKey}`);
    }

    return headers;
  },
});

type TCollection = {
  collection_id: string;
  name: string;
  cost: number;
  image?: string;
  description?: string;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Collections", "Orders"],
  endpoints: (build) => ({
    getCollections: build.query<TCollection[], void>({
      query: () => ({ url: "/collections", method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((_, idx) => ({
                type: "Collections" as const,
                id: idx,
              })),
              { type: "Collections", id: "LIST" },
            ]
          : [{ type: "Collections", id: "LIST" }],
    }),

    getCollection: build.query<TCollection | undefined, string>({
      query: (id) => ({
        url: `/collections?collection_id=eq.${id}`,
        method: "GET",
      }),
      transformResponse: (res: TCollection[]) => res[0],
      providesTags: (result, error, id) => [{ type: "Collections", id }],
    }),

    // create order (server validates token)
    // Define a type for the order creation response
    // createOrder: build.mutation<
    //   { orderId: string; status: string; message?: string }, // Replace with actual response shape
    //   { dressId: string; quantity?: number; token?: string }
    // >({
    //   query: ({ dressId, quantity = 1, token }) => ({
    //     url: "/orders/create",
    //     method: "POST",
    //     body: { dressId, quantity },
    //     headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    //   }),
    //   invalidatesTags: [{ type: "Orders", id: "LIST" }],
    // }),

    // getOrder: build.query<any, string>({
    //   query: (id) => ({ url: `/orders/${id}`, method: "GET" }),
    //   providesTags: (result, error, id) => [{ type: "Orders", id }],
    // }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionQuery,
  // useCreateOrderMutation,
  // useGetOrderQuery,
} = api;
export default api;
