import {
  useSaveProdsMutation,
  useGetProfileQuery,
} from "../store/apis/apiSlice";

export const useFavorite = () => {
  const { data, isLoading } = useGetProfileQuery();
  const [save, { isLoading: saving, error }] = useSaveProdsMutation();

  const favorites = data?.favorites || [];

  const isSaved = (id) =>
    favorites.some(
      (e) => (e._id?.toString() || e.toString()) === id.toString()
    );

  const toggleSaved = async (id) => {
    try {
      await save(id).unwrap();
    } catch (error) {
      console.error("收藏失敗", error);
    }
  };

  return { isLoading, saving, error, isSaved, toggleSaved };
};
