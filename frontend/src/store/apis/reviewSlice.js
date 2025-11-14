import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewApi = createApi({
  reducerPath: "review",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.DEV
      ? import.meta.env.VITE_SERVER_DEV
      : import.meta.env.VITE_SERVER_PRODUCTION,

    credentials: "include",
  }),
  tagTypes: ["Review"],
  // keepUnusedDataFor:5,
  endpoints(builder) {
    return {
      fetchSpecificReviews: builder.query({
        query: (orderId) => ({
          method: "GET",
          url: `/api/review/order/${orderId}`,
        }),
        providesTags: ["Review"],
      }),

      createReview: builder.mutation({
        query: (data) => ({
          method: "POST",
          body: data,
          url: "/api/review/create-review",
        }),
        invalidatesTags: ["Review"],
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const { orderId, reviews } = arg;

          const patchRes = dispatch(
            reviewApi.util.updateQueryData("createReview", undefined, (draft) =>
              reviews.forEach((r) =>
                draft.push({
                  _id: r.prodId,
                  prodId: r.prodId,
                  orderId,
                  rank: r.rank,
                  comment: r.comment,
                  optimistic: true,
                })
              )
            )
          );

          try {
            await queryFulfilled;
          } catch {
            patchRes.undo();
          }
        },
      }),
      fetchGroupsReview: builder.query({
        query: (id) => ({
          method: "GET",
          url: `/api/review/fetchjointreview/${id}`,
        }),
      }),
    };
  },
});

export const {
  useCreateReviewMutation,
  useLazyFetchSpecificReviewsQuery,
  useFetchGroupsReviewQuery,
} = reviewApi;

export { reviewApi };
