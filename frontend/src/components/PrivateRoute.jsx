import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import ProcessLoader from "../styles/UI/ProcessLoader";

import { toast } from "react-toastify";

function PrivateRoute() {
  const location = useLocation();
  const [showDirect, setShowDirect] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      toast.warn("請先登入帳戶", {
        toastId: "login-required",
        position: "top-center",
      });

      const timer = setTimeout(() => {
        setShowDirect(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [userInfo]);

  if (!userInfo) {
    if (showDirect) {
      return <Navigate to="/auth" replace state={{ from: location }} />;
    }
    return <ProcessLoader />;
  }

  return <Outlet />;
}

export default PrivateRoute;
