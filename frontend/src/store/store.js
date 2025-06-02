import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { usersApi } from "./apis/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
