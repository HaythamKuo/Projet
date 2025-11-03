import styled from "styled-components";
import { useRef } from "react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBtn from "../styles/UI/NavBtn";
import SideMember from "./SideMember";
import Switch from "../styles/UI/Switch";
import { logout } from "../store/slices/authSlice";
import { openCart, clearCart } from "../store/slices/cartSlice";
import { useLogoutUserMutation, usersApi } from "../store/apis/apiSlice";
import useClickOutside from "../hooks/useClickOutside";

const BarContainer = styled.div`
  display: none;

  ${({ theme }) => theme.media.md} {
    position: fixed;
    top: 5rem;
    right: 0;
    width: 70%;
    max-width: 300px;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.backGround};
    box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    z-index: 11;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.3s ease-in-out;
  }
`;

function SideNavBar({ isIncludePathname, onClick, open, setOpen }) {
  const controllRwdNav = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  //關閉rwd 的sideNavBar
  useClickOutside(controllRwdNav, () => setOpen(false));

  //處理rwd與全域登出的函式
  const [callLogoutApi, { isLoading: logoutTing }] = useLogoutUserMutation();

  async function handleRwdLogout() {
    try {
      await callLogoutApi();
      dispatch(usersApi.util.resetApiState());
      dispatch(clearCart());
      dispatch(logout());
      toast.success("成功登出");
      navigate("/");
    } catch (error) {
      console.error(error?.data?.message || "登出失敗");
    }
  }
  if (logoutTing) return <ProcessLoader />;

  return createPortal(
    <BarContainer open={open} ref={controllRwdNav}>
      <NavBtn ismobile name="首頁" address="/" />
      <NavBtn ismobile name="關於" />
      <NavBtn ismobile name="全部產品" address="products" />

      {userInfo ? (
        <>
          <SideMember />
          <NavBtn name="登出" ismobile btn onClick={() => handleRwdLogout()} />
        </>
      ) : (
        <NavBtn name="登入/註冊" ismobile address="auth" />
      )}

      {isIncludePathname && (
        <NavBtn
          ismobile
          name="購物車"
          onClick={() => {
            dispatch(openCart());
            setOpen(false);
          }}
        />
      )}
      <Switch onClick={onClick} />
    </BarContainer>,
    document.body
  );
}

export default SideNavBar;
