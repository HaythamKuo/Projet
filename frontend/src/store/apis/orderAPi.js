import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
    credentials: "include",
  }),

  endpoints(builder) {
    return {
      createOrder: builder.mutation({
        query: (data) => ({
          method: "POST",
          url: "/api/order",
          body: data,
        }),
      }),
    };
  },
});

export const { useCreateOrderMutation } = orderApi;
export { orderApi };
