import { useState, useEffect, useRef } from "react";
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

// import ProcessLoader from "../styles/UI/ProcessLoader";

function LoginDropDown() {
  const [openUser, setOpenUser] = useState(false);
  const closeTimeOut = useRef(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [callLogoutApi] = useLogoutUserMutation();

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
    try {
      await callLogoutApi().unwrap();
      dispatch(usersApi.util.resetApiState());
      dispatch(clearCart());
      dispatch(logout());
      toast.success("成功登出");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "登出失敗");
    }
  }

  return (
    <IconContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            <MenuItem as={Link} to="profile">
              我的帳戶
            </MenuItem>
            <MenuItem as={Link} to="profile/?tab=saved">
              我的清單
            </MenuItem>
            <MenuItem as={Link} to="profile/orders">
              我的訂單
            </MenuItem>
            <MenuItem>123</MenuItem>
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
