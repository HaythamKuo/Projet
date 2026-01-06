import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import { usersApi } from "./apis/apiSlice";
import { prodsApi } from "./apis/prodApiSlice";
import { orderApi } from "./apis/orderAPi";
import { reviewApi } from "./apis/reviewSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

const rootReducer = {
  cart: cartReducer,
  auth: authReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [prodsApi.reducerPath]: prodsApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
};

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(reviewApi.middleware)
        .concat(prodsApi.middleware)
        .concat(orderApi.middleware),
    preloadedState,
    devTools: true,
  });
const store = setupStore();

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(usersApi.middleware)
//       .concat(reviewApi.middleware)
//       .concat(prodsApi.middleware)
//       .concat(orderApi.middleware),
//   devTools: true,
// });

setupListeners(store.dispatch);

export default store;
