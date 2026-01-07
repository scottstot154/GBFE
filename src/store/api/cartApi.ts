import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem, CartResponse } from "@/types";

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include", // 🔑 Supabase auth via cookies
  }),

  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    // GET /api/cart
    getCart: builder.query<{ items: CartItem[]; total_price: string }, void>({
      query: () => "/cart",
      transformResponse: (response: CartResponse) => ({
        items: Array.isArray(response.items)
          ? response.items
          : JSON.parse(response.items),
        total_price: response.total_price,
      }),
      providesTags: ["Cart"],
    }),

    // POST /api/cart/items
    addToCart: builder.mutation<CartItem, { item_id: string }>({
      query: ({ item_id }) => ({
        url: "/cart/items",
        method: "POST",
        body: { item_id },
      }),
      invalidatesTags: ["Cart"],
    }),

    // PUT /api/cart/items/:id
    updateCartItem: builder.mutation<
      { success: true },
      { id: string; quantity: number }
    >({
      query: ({ id, quantity }) => ({
        url: `/cart/items/${id}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // DELETE /api/cart/items/:id
    removeCartItem: builder.mutation<{ success: true }, { item_id: string }>({
      query: ({ item_id }) => ({
        url: "/cart/items",
        method: "DELETE",
        body: { item_id },
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<{ success: true }, void>({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;
