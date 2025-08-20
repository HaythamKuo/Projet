import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import ProcessLoader from "../styles/UI/ProcessLoader";

import { toast } from "react-toastify";

function PrivateRoute() {
  const location = useLocation();
  const [showDirect, setShowDirect] = useState(false);
  const [showToast, setShowToast] = useState(false);

  //由userInfo來主導驗證
  const { userInfo } = useSelector((state) => state.auth);

  /**
   * @description
   * 監聽 userInfo 變化，控制延遲導向與 toast flag
   * 流程：
   * 1. 如果未登入，設置 0.5 秒的延遲定時器：
   *    - showDirect 設為 true → 控制 Navigate
   *    - showToast 設為 true → 控制 toast
   * 2. 如果 userInfo 有資料（登入成功），重置 showDirect 和 showToast
   */
  useEffect(() => {
    if (!userInfo) {
      const timer = setTimeout(() => {
        setShowDirect(true);
        setShowToast(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowDirect(false);
      setShowToast(false);
    }
  }, [userInfo]);

  /**
   * @description
   * 監聽 showToast flag，僅在 flag 為 true 且未登入時顯示 toast
   * 顯示後立即重置 flag，防止多次觸發
   */
  useEffect(() => {
    if (showToast && !userInfo) {
      toast.warn("請先登入帳戶", {
        toastId: "login-required",
        position: "top-center",
      });
      setShowToast(false);
    }
  }, [showToast, userInfo]);

  // 還在延遲期間，顯示 Loader
  if (!userInfo && !showDirect) return <ProcessLoader />;

  // 延遲結束，仍未登入 → 導向登入頁
  if (!userInfo && showDirect)
    return <Navigate to="/auth" replace state={{ from: location }} />;

  // 有 userInfo，放行
  return <Outlet />;
}

export default PrivateRoute;
