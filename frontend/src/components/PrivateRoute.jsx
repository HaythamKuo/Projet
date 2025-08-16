//import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../store/apis/apiSlice";
//import { useSelector } from "react-redux";
import ProcessLoader from "../styles/UI/ProcessLoader";
// import { OverLay } from "../styles/CartDrawer.style";
// import Loader from "../styles/UI/Loader";
import { toast } from "react-toastify";

function PrivateRoute() {
  const location = useLocation();
  //const { userInfo } = useSelector((state) => state.auth);
  //const [showRedirect, setShowRedirect] = useState(false);

  const { data: profile, isLoading, isError, error } = useGetProfileQuery();

  if (isLoading) return <ProcessLoader />;

  if (isError || !profile) {
    toast.warn("請先登入帳戶", {
      toastId: "login-required",
      position: "top-center",
    });
    console.log("PrivateRoute發生", error);
    return <Navigate to="auth" replace state={{ from: location }} />;
  }

  return <Outlet />;

  //   useEffect(() => {
  //     if (!profile) {
  //       toast.warn("請先登入帳戶", {
  //         toastId: "login-required",
  //         position: "top-center",
  //       });

  //       const timer = setTimeout(() => {
  //         setShowRedirect((pre) => !pre);
  //       }, 500);

  //       return () => clearTimeout(timer);
  //     }
  //   }, [profile]);

  //   if (!profile) {
  //     if (showRedirect) {
  //       return <Navigate to="auth" replace state={{ from: location }} />;
  //     }
  //     return (
  //       <OverLay>
  //         <Loader $heightlight={1000} />
  //       </OverLay>
  //     );
  //   }
  //   return <Outlet />;
}

export default PrivateRoute;
