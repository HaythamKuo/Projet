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

  useEffect(() => {
    if (showToast && !userInfo) {
      toast.warn("請先登入帳戶", {
        toastId: "login-required",
        position: "top-center",
      });
      setShowToast(false);
    }
  }, [showToast, userInfo]);

  if (!userInfo && !showDirect) return <ProcessLoader />;
  // 如果沒有 userInfo，導向登入
  if (!userInfo && showDirect)
    return <Navigate to="/auth" replace state={{ from: location }} />;

  // 有 userInfo，放行
  return <Outlet />;
}

export default PrivateRoute;
