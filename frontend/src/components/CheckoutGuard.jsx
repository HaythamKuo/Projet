import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCartItems } from "../store/slices/cartSlice";
import ProcessLoader from "../styles/UI/ProcessLoader";

function CheckoutGuard({ children }) {
  const items = useSelector(selectCartItems);
  const { isLoading } = useSelector((state) => state.cart);

  if (isLoading) return <ProcessLoader />;

  if (!items || items.length === 0) {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default CheckoutGuard;
