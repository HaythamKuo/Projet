import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import ProcessLoader from "../styles/UI/ProcessLoader";
import { useGetProfileQuery } from "../store/apis/apiSlice";
import { setCredentials } from "../store/slices/authSlice";

import { toast } from "react-toastify";

function PrivateRoute() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showDirect, setShowDirect] = useState(false);

  const { data, isLoading } = useGetProfileQuery();

  //由userInfo來主導驗證
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo && data) dispatch(setCredentials(data));
  }, [data, dispatch, userInfo]);

  useEffect(() => {
    if (!userInfo && !isLoading) {
      toast.warn("請先登入帳戶", {
        toastId: "login-required",
        position: "top-center",
      });

      const timer = setTimeout(() => {
        setShowDirect(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [userInfo, isLoading]);

  if (isLoading || (!userInfo && !showDirect)) return <ProcessLoader />;

  // 如果沒有 userInfo，導向登入
  if (!userInfo && showDirect)
    return <Navigate to="/auth" replace state={{ from: location }} />;

  // 有 userInfo，放行
  return <Outlet />;
}

export default PrivateRoute;
