import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "userInfo",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints(builder) {
    return {
      register: builder.mutation({
        query: (data) => ({
          method: "POST",
          url: "/api/users/register",
          body: data,
        }),
        invalidatesTags: ["User"],
      }),

      login: builder.mutation({
        query: (data) => ({
          method: "POST",
          url: "/api/users/login",
          body: data,
        }),
        invalidatesTags: ["User"],
      }),

      logoutUser: builder.mutation({
        query: () => ({
          method: "POST",
          url: "/api/users/logout",
        }),
        invalidatesTags: ["User"],
      }),

      getProfile: builder.query({
        query: () => ({
          method: "GET",
          url: "/api/users/profile",
        }),
        providesTags: ["User"],
      }),
    };
  },
});
export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutUserMutation,
  useRegisterMutation,
} = usersApi;
export { usersApi };
