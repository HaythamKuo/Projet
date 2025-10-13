import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { pause } from "./prodApiSlice";

const customBaseQuery = async (...args) => {
  await pause(2000);
  return fetchBaseQuery({
    baseUrl: "http://localhost:5001",
    credentials: "include",
  })(...args);
};

const usersApi = createApi({
  reducerPath: "userInfo",
  baseQuery: customBaseQuery,
  tagTypes: ["User", "Collection"],
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
      changeAddress: builder.mutation({
        query: (address) => ({
          method: "PUT",
          url: "/api/users/editaddress",
          body: address,
        }),
      }),
      saveProds: builder.mutation({
        query: (productId) => ({
          method: "POST",
          url: `/api/users/favorite/${productId}`,
        }),
        invalidatesTags: ["Collection"],
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          const patchRes = dispatch(
            usersApi.util.updateQueryData("getProfile", undefined, (draft) => {
              if (!draft.favorites) draft.favorites = [];
              const idx = draft.favorites.indexOf(id);
              if (idx === -1) {
                draft.favorites.push(id);
              } else {
                draft.favorites.splice(idx, 1);
              }
            })
          );

          try {
            await queryFulfilled;
          } catch (err) {
            patchRes.undo();
            console.log("無法收藏產品,將會回滾", err);
          }
        },
      }),
      getSaveProds: builder.query({
        query: (id) => ({
          method: "GET",
          url: `/api/users/${id}/favorites`,
        }),
        providesTags: ["Collection"],
      }),
    };
  },
});
export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutUserMutation,
  useRegisterMutation,
  useChangeAddressMutation,
  useSaveProdsMutation,
  useGetSaveProdsQuery,
} = usersApi;
export { usersApi };
