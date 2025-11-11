import { useGetSaveProdsQuery } from "../store/apis/apiSlice";

export function useIsaved(prodId) {
  return useGetSaveProdsQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      isSaved: data?.some((p) => p._id === prodId) ?? false,
    }),
  });
}
