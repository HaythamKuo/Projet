import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// import { pause } from "./prodApiSlice";

// const customBaseQuery = async (...args) => {
//   await pause(2000);
//   return fetchBaseQuery({
//     baseUrl: "http://localhost:5001",
//     credentials: "include",
//   })(...args);
// };

const usersApi = createApi({
  reducerPath: "userInfo",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.DEV
      ? import.meta.env.VITE_SERVER_DEV
      : import.meta.env.VITE_SERVER_PRODUCTION,
    credentials: "include",
  }),
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

      // 儲存/收藏產品
      saveProds: builder.mutation({
        query: (prodId) => ({
          method: "POST",
          url: `/api/users/favorite/${prodId}`,
        }),
        invalidatesTags: ["Collection", "User"],

        //middleware
        async onQueryStarted(productId, { dispatch, queryFulfilled }) {
          // const { _id: userId } = store.getState().auth.userInfo;

          // const patchRes = dispatch(
          //   usersApi.util.updateQueryData("getProfile", undefined, (draft) => {
          //     if (!draft.favorites) draft.favorites = [];
          //     const idx = draft.favorites.indexOf(productId);
          //     if (idx === -1) {
          //       draft.favorites.push(productId);
          //     } else {
          //       draft.favorites.splice(idx, 1);
          //     }
          //   })
          // );

          const patchSaveprods = dispatch(
            usersApi.util.updateQueryData(
              "getSaveProds",
              undefined,
              (draft) => {
                //draft → {物品id,名字, 圖片 }
                const idx = draft.findIndex((p) => p._id === productId);

                if (idx === -1) {
                  draft.push(productId);
                } else {
                  draft.splice(idx, 1);
                }
              }
            )
          );

          try {
            await queryFulfilled;
          } catch (err) {
            patchSaveprods.undo();
            console.log("無法收藏產品,將會回滾", err);
          }
        },
      }),
      getSaveProds: builder.query({
        query: () => ({
          method: "GET",
          url: `/api/users/favorites`,
        }),
        providesTags: ["Collection"],
      }),

      removeProds: builder.mutation({
        query: ({ prodId }) => ({
          method: "DELETE",
          url: `/api/users/favorites/${prodId}`,
        }),
        invalidatesTags: ["Collection"],
        async onQueryStarted({ prodId, userId }, { dispatch, queryFulfilled }) {
          const patchRes = dispatch(
            usersApi.util.updateQueryData("getSaveProds", userId, (draft) => {
              // //找到相對應的產品 有的話就刪除 沒有的話就回滾

              const idx = draft.findIndex((p) => p._id === prodId);

              if (idx === -1) return;
              draft.splice(idx, 1);
            })
          );

          const patchToProfile = dispatch(
            usersApi.util.updateQueryData("getProfile", undefined, (draft) => {
              if (!draft.favorites) draft.favorites = [];
              const idx = draft.favorites.indexOf(prodId);
              if (idx !== -1) draft.favorites.splice(idx, 1);
            })
          );

          try {
            await queryFulfilled;
          } catch (error) {
            patchRes.undo();
            patchToProfile.undo();
            console.log("無法刪除產品,將會回滾", error);
          }
        },
      }),
      third_party_unbind: builder.mutation({
        query: (provider) => ({
          method: "DELETE",
          body: { provider },
          url:
            provider === "google"
              ? "/api/google/auth/google/unbind"
              : "/api/line/unbind",
        }),
        invalidatesTags: ["User"],
        async onQueryStarted(provider, { dispatch, queryFulfilled }) {
          const patch = dispatch(
            usersApi.util.updateQueryData("getProfile", undefined, (draft) => {
              if (provider === "google") {
                draft.googleId = null;
              } else if (provider === "line") {
                draft.lineId = null;
              }
            })
          );
          try {
            await queryFulfilled();
          } catch {
            patch.undo();
          }
        },
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
  useRemoveProdsMutation,
  useThird_party_unbindMutation,
} = usersApi;
export { usersApi };
