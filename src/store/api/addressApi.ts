import { createApi } from "@reduxjs/toolkit/query/react";
import { Address } from "@/types";
import { supabaseBaseQuery } from "./supabaseBaseQuery";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: supabaseBaseQuery(),
  tagTypes: ["Addresses"],

  endpoints: (builder) => ({
    // ---------------------------
    // GET ADDRESSES
    // ---------------------------
    getAddresses: builder.query<Address[], void>({
      query: () => ({
        table: "addresses",
        action: "select",
      }),
      providesTags: ["Addresses"],
    }),

    // ---------------------------
    // ADD ADDRESS
    // ---------------------------
    addAddress: builder.mutation<void, Partial<Address>>({
      query: (values) => ({
        table: "addresses",
        action: "insert",
        values,
      }),
      invalidatesTags: ["Addresses"],
    }),

    // ---------------------------
    // UPDATE ADDRESS
    // ---------------------------
    updateAddress: builder.mutation<
      void,
      { id: string; data: Partial<Address> }
    >({
      query: ({ id, data }) => ({
        table: "addresses",
        action: "update",
        match: { id },
        values: data,
      }),
      invalidatesTags: ["Addresses"],
    }),

    // ---------------------------
    // DELETE ADDRESS
    // ---------------------------
    deleteAddress: builder.mutation<void, string>({
      query: (id) => ({
        table: "addresses",
        action: "delete",
        match: { id },
      }),
      invalidatesTags: ["Addresses"],
    }),

    // ---------------------------
    // SET DEFAULT ADDRESS
    // ---------------------------
    setDefaultAddress: builder.mutation<void, string>({
      query: (id) => ({
        table: "addresses",
        action: "update",
        match: { id },
        values: { is_default: true },
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressApi;
