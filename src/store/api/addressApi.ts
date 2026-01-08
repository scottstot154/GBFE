import { Address } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Address"],

  endpoints: (builder) => ({
    getAddresses: builder.query<{ addresses: Address[] }, void>({
      query: () => "/addresses",
      providesTags: ["Address"],
    }),

    addAddress: builder.mutation<Address, Partial<Address>>({
      query: (body) => ({
        url: "/addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const { useGetAddressesQuery, useAddAddressMutation } = addressApi;
