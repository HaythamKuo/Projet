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
        query: ({ all = false, sort = "desc" }) => ({
          method: "GET",
          url: all
            ? `/api/order/prodorders?all=${all}&sort=${sort}`
            : `/api/order/prodorders`,
        }),
      }),
      getSingleOrder: builder.query({
        query: (orderId) => ({
          method: "GET",
          url: `/api/order/prodorders/${orderId}`,
        }),
      }),

      //綠界金流api
      createEcPayment: builder.mutation({
        query: (data) => ({
          method: "POST",
          url: "/api/ecpay/create-payment",
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
  useGetSingleOrderQuery,
} = orderApi;
export { orderApi };
