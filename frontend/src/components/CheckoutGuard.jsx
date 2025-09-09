import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods } from "../store/thunks/fetchGoods";
import { selectCartItems } from "../store/slices/cartSlice";

function CheckoutGuard({ children }) {
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);

  useEffect(() => {
    dispatch(fetchGoods());
  }, [dispatch]);

  if (!items || items.length === 0) {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default CheckoutGuard;
