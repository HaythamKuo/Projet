import { useEffect, useRef } from "react";
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
  const prePath = useRef(location.pathname);

  useEffect(() => {
    if (
      prePath.current !== location.pathname &&
      !excludePaths.includes(location.pathname)
    ) {
      dispatch(closeCart());
    }

    prePath.current = location.pathname;
  }, [location.pathname, dispatch, excludePaths]);

  return null;
}
