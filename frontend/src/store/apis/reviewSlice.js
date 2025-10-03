import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewApi = createApi({
  reducerPath: "review",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api/review",
    credentials: "include",
  }),
  tagTypes: ["Review"],
  // keepUnusedDataFor:5,
  endpoints(builder) {
    return {
      fetchSpecificReviews: builder.query({
        query: (orderId) => ({
          method: "GET",
          url: `/order/${orderId}`,
        }),
        providesTags: ["Review"],
      }),

      createReview: builder.mutation({
        query: (data) => ({
          method: "POST",
          body: data,
          url: "/create-review",
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
          url: `/fetchjointreview/${id}`,
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
