import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import { usersApi } from "./apis/apiSlice";
import { prodsApi } from "./apis/prodApiSlice";
import { orderApi } from "./apis/orderAPi";
import { setupListeners } from "@reduxjs/toolkit/query/react";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [prodsApi.reducerPath]: prodsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(prodsApi.middleware)
      .concat(orderApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
