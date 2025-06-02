import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "userInfo",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: (data) => ({
          method: "POST",
          url: "/api/users/login",
          body: data,
        }),
      }),
    };
  },
});
export const { useLoginMutation } = usersApi;
export { usersApi };
