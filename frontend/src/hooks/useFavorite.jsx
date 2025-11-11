import {
  useSaveProdsMutation,
  useGetSaveProdsQuery,
  // useGetProfileQuery,
} from "../store/apis/apiSlice";

export const useFavorite = () => {
  // const { data, isLoading } = useGetProfileQuery();
  const { data: favorites = [], isLoading } = useGetSaveProdsQuery();
  const [save, { isLoading: saving, error }] = useSaveProdsMutation();

  // const favorites = data?.favorites || [];

  // const isSaved = (prodId) => {
  //   return favorites.some(
  //     (e) => (e._id?.toString() || e?.toString()) === prodId.toString()
  //   );
  // };
  const isStored = (prodId) => favorites.some((p) => p._id === prodId);

  // const isSaved = (prodId) => {
  //   // console.log("isSaved", prodId);

  //   const isTrue = favorites.some((p) => p._id === prodId);
  //   // console.log(isTrue);

  //   return isTrue;
  // };

  const toggleSaved = async (id) => {
    // console.log("toggleSaved", id);

    try {
      await save(id).unwrap();
      //const res = await save({ userId, prodId }).unwrap();
      // console.log(res);
    } catch (error) {
      console.error("收藏失敗", error);
    }
  };

  return { isLoading, saving, error, toggleSaved, isStored };
};
