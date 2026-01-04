import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem } from "@/types";

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include", // 🔑 Supabase auth via cookies
  }),

  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    // GET /api/cart
    getCart: builder.query<{ items: CartItem[] }, void>({
      query: () => "/cart",
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
    removeCartItem: builder.mutation<
      { success: true },
      { cart_item_id: string }
    >({
      query: ({ cart_item_id }) => ({
        url: `/cart/items`,
        method: "DELETE",
        body: { cart_item_id },
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
} = cartApi;
