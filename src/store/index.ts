// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import api from "./api";
import { cartApi } from "./api/cartApi";
import { addressApi } from "./api/addressApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    // add other reducers here (cart, auth, ui)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      cartApi.middleware,
      addressApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
