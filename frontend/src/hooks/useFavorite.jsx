import {
  useSaveProdsMutation,
  useGetProfileQuery,
} from "../store/apis/apiSlice";

const useFavorite = (id) => {
  const { data, isLoading } = useGetProfileQuery();
  const [save, { isLoading: saving, error }] = useSaveProdsMutation();

  const favorites = data?.favorites || [];
  const isSaved = favorites.some(
    (e) => (e._id ? e._id.toString() : e.toString()) === id.toString()
  );

  const toggleSaved = async () => {
    try {
      await save(id).unwrap();
    } catch (error) {
      //toast.error(error?.data?.message);
      console.error("收藏失敗", error);
    }
  };

  return { isLoading, saving, error, isSaved, toggleSaved };
};

export { useFavorite };
