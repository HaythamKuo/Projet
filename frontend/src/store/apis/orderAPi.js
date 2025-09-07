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
      getOrder: builder.query({
        query: () => ({ method: "GET", url: "/api/order/latest" }),
      }),

      //綠界金流api
      createEcPayment: builder.mutation({
        query: (data) => ({
          method: "POST",
          url: "api/ecpay/create-payment",
          body: data,
        }),
      }),
    };
  },
});

export const {
  useGetOrderQuery,
  useCreateEcPaymentMutation,
  useCreateOrderMutation,
} = orderApi;
export { orderApi };
