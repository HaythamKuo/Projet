import { Navigate, useMatch, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ProcessLoader from "../styles/UI/ProcessLoader";

function PublicrouteHandle() {
  const { userInfo, isLoading } = useSelector((state) => state.auth);

  const isAuthRoute = !!useMatch("/auth/*");

  /**
   * 如果有userInfo 就拒絕進入auth
   * 反之直接導向auth
   */

  if (isLoading) return <ProcessLoader />;

  if (userInfo && isAuthRoute) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default PublicrouteHandle;

// function PublicrouteHandle() {
//   const { userInfo } = useSelector((state) => state.auth);
//   const isAuthRoute = !!useMatch("/auth/*");

//   if (userInfo && isAuthRoute) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// }

// export default PublicrouteHandle;
