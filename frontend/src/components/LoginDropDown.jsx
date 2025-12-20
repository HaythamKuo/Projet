import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  IconContainer,
  UserIcon,
  DropDownMenu,
  MenuSection,
  MenuList,
  MenuItem,
  BtnWrapper,
  SignInButton,
  UserState,
  StateBox,
} from "../styles/loginDropDown.style";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

import { clearCart } from "../store/slices/cartSlice";
import { useLogoutUserMutation, usersApi } from "../store/apis/apiSlice";

import { toast } from "react-toastify";
import useClickOutside from "../hooks/useClickOutside";
import useObserverInnerWidth from "../hooks/useObserverInnerWidth";

const units = [
  { label: "我的帳戶", path: "profile" },
  { label: "我的清單", path: "profile/?tab=saved" },
  { label: "我的訂單", path: "profile/orders" },
];

// import ProcessLoader from "../styles/UI/ProcessLoader";

function LoginDropDown() {
  const controllDropBar = useRef(null);

  // const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const isMobile = useObserverInnerWidth(1024);
  const [openUser, setOpenUser] = useState(false);
  const closeTimeOut = useRef(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [callLogoutApi] = useLogoutUserMutation();

  //控制rwd之下的dropdownBar
  useClickOutside(
    controllDropBar,
    useCallback(() => {
      if (isMobile) setOpenUser(false);
    }, [isMobile])
  );

  /////////////////////////
  useEffect(() => {
    return () => {
      if (closeTimeOut.current) clearTimeout(closeTimeOut.current);
    };
  }, []);

  function handleMouseEnter() {
    if (closeTimeOut.current) {
      clearTimeout(closeTimeOut.current);
      closeTimeOut.current = null;
    }

    setOpenUser(true);
  }

  function handleMouseLeave() {
    if (closeTimeOut.current) {
      clearTimeout(closeTimeOut.current);
    }

    closeTimeOut.current = setTimeout(() => {
      setOpenUser(false);
      closeTimeOut.current = null;
    }, 500);
  }

  async function handleLogout() {
    dispatch(logout());
    dispatch(clearCart());
    try {
      await callLogoutApi().unwrap();
      dispatch(usersApi.util.resetApiState());

      toast.success("成功登出");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "登出失敗");
    }
  }

  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth < 1024);
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <IconContainer
      ref={controllDropBar}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onClick={isMobile ? () => setOpenUser((pre) => !pre) : undefined}
    >
      <StateBox
        as={userInfo ? "div" : Link}
        to={userInfo ? undefined : "/auth"}
      >
        <UserIcon />
        <UserState>{userInfo ? "Sign out" : "Sign in"}</UserState>
      </StateBox>

      <DropDownMenu $isOpen={openUser}>
        <MenuSection>
          <MenuList>
            {units.map(({ label, path }) => (
              <MenuItem as={Link} to={path} key={label}>
                {label}
              </MenuItem>
            ))}
          </MenuList>
        </MenuSection>

        <BtnWrapper>
          {userInfo ? (
            <SignInButton onClick={handleLogout}>登出</SignInButton>
          ) : (
            <SignInButton as={Link} to="auth">
              登入
            </SignInButton>
          )}
        </BtnWrapper>
      </DropDownMenu>
    </IconContainer>
  );
}
export default LoginDropDown;
