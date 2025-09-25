/**
 * CheckoutGuard Component
 *
 * React Route 守門元件，用於保護結帳頁面：
 * 1. 進入頁面時自動 dispatch `fetchGoods` 以取得資料庫中的購物車內容。
 * 2. 在資料讀取期間顯示載入動畫 (ProcessLoader)。
 * 3. 若資料抓取完成且購物車為空，導向 `/products`。
 * 4. 若購物車內有商品，渲染子元件 (通常是 <Checkout />)。
 *
 * @component
 * @param {Object} props - 元件的屬性。
 * @param {React.ReactNode} props.children - 需要受保護的頁面內容。
 * @returns {JSX.Element} 如果符合條件則回傳子元件，否則回傳 Loader 或 Redirect。
 *
 * @example
 * // routes/index.jsx
 * {
 *   path: "checkout",
 *   element: (
 *     <CheckoutGuard>
 *       <Checkout />
 *     </CheckoutGuard>
 *   ),
 * }
 */
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
