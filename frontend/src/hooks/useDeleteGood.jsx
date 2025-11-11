import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeItem, restoreItem } from "../store/slices/cartSlice";
import { deleteGood } from "../store/thunks/deleteGood";

export function useDeleteGood() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.cart);

  const handleDelete = async (item) => {
    dispatch(removeItem(item._id));

    try {
      await dispatch(deleteGood(item._id)).unwrap();
      toast.success("刪除成功");
    } catch (error) {
      dispatch(restoreItem(item));
      console.log(error);
      toast.error("刪除失敗");
    }
  };

  return { handleDelete, isLoading };
}
