import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const prodsApi = createApi({
  reducerPath: "allProds",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
  }),
  tagTypes: ["Product"],
  endpoints(builder) {
    return {
      fetchProd: builder.query({
        query: () => ({
          method: "GET",
          url: "/api/prods/getprods",
        }),
        providesTags: ["Product"],
      }),
    };
  },
});

export const { useFetchProdQuery } = prodsApi;

export { prodsApi };
