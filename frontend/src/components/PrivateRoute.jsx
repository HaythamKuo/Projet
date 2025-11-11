import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../store/apis/apiSlice";
import { logout, setCredentials } from "../store/slices/authSlice";

import ProcessLoader from "../styles/UI/ProcessLoader";

function PrivateRoute() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const isAuthorized = !!userInfo;

  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfileQuery(undefined, { skip: isAuthorized });

  // 檢查 API 錯誤（特別是 401），但只有在沒有 userInfo 的情況下才處理
  useEffect(() => {
    // 只有在請求有錯誤 且 錯誤狀態是 401
    // 並且 Redux 中沒有 userInfo (表示 token 無效且未登入) 時，才執行導航
    if (error?.status === 401) {
      // 確保 Redux store 和 localStorage 清空，即使 userInfo 已經為空
      dispatch(logout());

      // 提示使用者登入
      toast.warn("請先登入帳戶", {
        toastId: "login-required",
        position: "top-center",
      });
    }

    // 如果 API 成功取得 profile，且 Redux 中沒有 userInfo，則更新 Redux Store
    if (profile && !userInfo) {
      dispatch(setCredentials(profile));
    }
    // 注意: 這裡的依賴項需要精簡，確保邏輯正確觸發
  }, [dispatch, error, profile, userInfo, location]);

  if (isLoading && !userInfo) return <ProcessLoader />;

  const isPassSuccess = !!userInfo || !!profile;

  // console.log(isPassSuccess);

  if (!isPassSuccess)
    return <Navigate to="auth" replace state={{ from: location }} />;

  // 有 userInfo，放行
  return <Outlet />;
}
export default PrivateRoute;
