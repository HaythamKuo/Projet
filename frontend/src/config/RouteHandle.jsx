import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeCart } from "../store/slices/cartSlice";

/**
 * RouteChangeHandler
 * 每次路由變化時觸發
 * 可以自動關閉購物車，並可排除特定頁面
 */
export default function RouteHandle({ excludePaths = [] }) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!excludePaths.includes(location.pathname)) {
      dispatch(closeCart());
    }
  }, [location.pathname, dispatch, excludePaths]);

  return null; // 這個組件不渲染任何 UI
}
