import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const customBaseQuery = async (...args) => {
  await pause(2000);
  return fetchBaseQuery({
    baseUrl: "http://localhost:5001",
    credentials: "include",
  })(...args);
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

      fetchMyProds: builder.query({
        query: () => ({
          method: "GET",
          url: "/api/prods/mine",
        }),
        providesTags: ["Product"],
      }),

      uploadProds: builder.mutation({
        query: (data) => ({
          method: "POST",
          url: "/api/prods/createprod",
          body: data,
        }),
        invalidatesTags: ["Product"],
      }),
      fetchSpecificProd: builder.query({
        query: (id) => ({
          method: "GET",
          url: `/api/prods/${id}`,
        }),
        providesTags: (result, err, { id }) => [{ type: "Product", id }],
      }),
      editMyProd: builder.mutation({
        query: ({ id, formData }) => ({
          method: "PUT",
          url: `/api/prods/editprod/${id}`,
          body: formData,
        }),
      }),
      deleteMyProd: builder.mutation({
        query: (id) => ({
          method: "DELETE",
          url: `/api/prods/deleteprod/${id}`,
        }),
        invalidatesTags: ["Product"],
      }),
    };
  },
});

export const {
  useFetchProdQuery,
  useFetchSpecificProdQuery,
  useUploadProdsMutation,
  useFetchMyProdsQuery,
  useEditMyProdMutation,
  useDeleteMyProdMutation,
} = prodsApi;

export { prodsApi };
