import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AUTH_ERROR_MAP = {
  not_logged_in: {
    title: "尚未登入",
    message: "請先登入帳戶後，再進行 LINE 綁定。",
  },
  bind_failed: {
    title: "綁定失敗",
    message: "LINE 綁定失敗，請稍後再試。",
  },
  conflict: {
    title: "帳戶衝突",
    message: "此 LINE 帳戶已被其他使用者綁定。",
  },
  line_already_bound: {
    title: "已綁定 LINE",
    message: "你的帳戶已經綁定 LINE，無需再次操作。",
  },
  line_login_failed: {
    title: "無法獲得授權",
    message: "無法獲得你的 line 帳戶授權",
  },
  google_same_email: {
    title: "重複郵件",
    message: "該郵件已有其他人使用",
  },
};

export default function useHandleErr() {
  const hasErr = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchparam] = useSearchParams();
  const errCode = searchparam.get("error");

  useEffect(() => {
    if (!errCode) {
      hasErr.current = null;
      return;
    }

    if (hasErr.current === errCode) return;

    const errInfo = AUTH_ERROR_MAP[errCode] || {
      title: "發生錯誤",
      message: "系統發生未知錯誤，請稍後再試。",
    };
    toast.error(`${errInfo.title}: ${errInfo.message}`);

    hasErr.current = errCode;

    //複製當前所有？參數
    const newParams = new URLSearchParams(searchparam);

    //只刪除指定
    newParams.delete("error");

    navigate(
      { pathname: location.pathname, search: newParams.toString() },
      { replace: true }
    );
  }, [errCode, location.pathname, navigate, searchparam]);
}
