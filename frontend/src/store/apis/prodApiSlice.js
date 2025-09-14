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
  tagTypes: ["Product", "MyProduct"],
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
        providesTags: ["MyProduct"],
      }),

      uploadProds: builder.mutation({
        query: (data) => ({
          method: "POST",
          url: "/api/prods/createprod",
          body: data,
        }),
        invalidatesTags: ["Product", "MyProduct"],
      }),
      fetchSpecificProd: builder.query({
        query: (id) => ({
          method: "GET",
          url: `/api/prods/${id}`,
        }),
        providesTags: (result, err, id) => [{ type: "Product", id }],
      }),
      editMyProd: builder.mutation({
        query: ({ id, formData }) => ({
          method: "PUT",
          url: `/api/prods/editprod/${id}`,
          body: formData,
        }),
        invalidatesTags: (result, err, { id }) => [
          { type: "Product", id },
          "Product",
          "MyProduct",
        ],
      }),
      deleteMyProd: builder.mutation({
        query: (id) => ({
          method: "DELETE",
          url: `/api/prods/deleteprod/${id}`,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          const patchRes = dispatch(
            prodsApi.util.updateQueryData(
              "fetchMyProds",
              undefined,
              (draft) => {
                const prodId = draft.findIndex((prod) => prod._id === id);

                if (prodId !== -1) draft.splice(prodId, 1);
              }
            )
          );

          try {
            await queryFulfilled;
          } catch (error) {
            patchRes.undo();
            console.error("後端刪除失敗，回滾 UI：", error);
          }
        },

        invalidatesTags: (result, err, { id }) => [
          { type: "Product", id },
          "Product",
          "MyProduct",
        ],
      }),
      searchProd: builder.query({
        query: (query) => ({
          method: "GET",
          url: `/api/prods/search?query=${query}`,
        }),
        providesTags: ["Product"],
      }),

      fetchCategories: builder.query({
        query: () => ({
          method: "GET",
          url: "/api/prods/category",
        }),
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
  useFetchCategoriesQuery,
  useSearchProdQuery,
} = prodsApi;

export { prodsApi };
