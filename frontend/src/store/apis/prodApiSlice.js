import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const customBaseQuery = async (...args) => {
  await pause(2000);
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
        invalidatesTags: ["Product"],
      }),

      uploadProds: builder.mutation({
        query: (data) => ({
          method: "POST",
          url: "/api/prods/createprod",
          body: data,
        }),
        providesTags: ["Product"],
      }),
      fetchSpecificProd: builder.query({
        query: (id) => ({
          method: "GET",
          url: `/api/prods/${id}`,
        }),
      }),
    };
  },
});

export const {
  useFetchProdQuery,
  useFetchSpecificProdQuery,
  useUploadProdsMutation,
} = prodsApi;

export { prodsApi };
