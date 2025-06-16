import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const customBaseQuery = async (...args) => {
  await pause(2000); // 模擬延遲一秒
  return fetchBaseQuery({ baseUrl: "http://localhost:5001" })(...args);
};

const prodsApi = createApi({
  reducerPath: "allProds",
  baseQuery: customBaseQuery,
  tagTypes: ["Product"],
  endpoints(builder) {
    return {
      fetchProd: builder.query({
        query: () => ({
          method: "GET",
          url: "/api/prods/",
        }),
        providesTags: ["Product"],
      }),

      uploadProds: builder.mutation({
        query: (data) => ({
          method: "POST",
          url: "/api/prods/createpord",
          body: data,
        }),
        invalidatesTags: ["Product"],
      }),
    };
  },
});

export const { useFetchProdQuery, useUploadProdsMutation } = prodsApi;

export { prodsApi };
