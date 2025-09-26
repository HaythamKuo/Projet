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
        // query: (data) => ({
        //   method: "POST",
        //   body: data,
        //   url: "/create-review",
        // })
        query(data) {
          return {
            method: "POST",
            body: data,
            url: "/create-review",
          };
        },
      }),
    };
  },
});

export const { useCreateReviewMutation } = reviewApi;

export { reviewApi };
