import { Outlet, Navigate, useLocation } from "react-router-dom";
import {} from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  //要做個spinner
  // if (isFetching) {
  //     return <div>載入中…</div>; // 或者你自己做個 loading component
  //   }
  if (!userInfo) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

export default PrivateRoute;
