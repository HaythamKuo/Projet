import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewApi = createApi({
  reducerPath: "review",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api/review",
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      createReview: builder.mutation({
        query: (data) => ({
          method: "POST",
          body: data,
          url: "/create-review",
        }),
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
        // query(data) {
        //   return {
        //     method: "POST",
        //     body: data,
        //     url: "/create-review",
        //   };
        // },
      }),
    };
  },
});

export const { useCreateReviewMutation } = reviewApi;

export { reviewApi };
