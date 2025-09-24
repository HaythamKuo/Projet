import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../store/slices/cartSlice";
import { fetchGoods } from "../store/thunks/fetchGoods";
import ProcessLoader from "../styles/UI/ProcessLoader";

function CheckoutGuard({ children }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const { isLoading, hasFetched } = useSelector((state) => state.cart);

  // 首次進入就抓資料
  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchGoods());
    }
  }, [dispatch, hasFetched]);

  if (isLoading || !hasFetched) return <ProcessLoader />;

  if (!items || items.length === 0) {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default CheckoutGuard;
