import { useGetSaveProdsQuery } from "../store/apis/apiSlice";

export function useIsSaved(prodId) {
  return useGetSaveProdsQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      isSaved: data?.some((p) => p._id === prodId) ?? false,
    }),
  });
}
