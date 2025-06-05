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
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useLogoutUserMutation } from "../store/apis/apiSlice";

function LoginDropDown() {
  const [openUser, setOpenUser] = useState(false);
  const closeTimeOut = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [callLogoutApi] = useLogoutUserMutation();

  const isUser = userInfo ? "Sign out" : "Sign in";

  useEffect(() => {
    const clearTimeRef = closeTimeOut.current;
    return () => {
      if (clearTimeRef) clearTimeout(clearTimeRef);
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
      closeTimeOut(closeTimeOut.current);
    }

    closeTimeOut.current = setTimeout(() => {
      setOpenUser(false);
      closeTimeOut.current = null;
    }, 500);
  }

  async function handleLogout() {
    try {
      await callLogoutApi().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <IconContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StateBox>
        <UserIcon />
        <UserState>{isUser}</UserState>
      </StateBox>

      <DropDownMenu $isOpen={openUser}>
        <MenuSection>
          <MenuList>
            <MenuItem>
              <Link to="auth">我的帳戶</Link>
            </MenuItem>
            <MenuItem>我的清單</MenuItem>
            <MenuItem>我的訂單</MenuItem>
            <MenuItem>123</MenuItem>
          </MenuList>
        </MenuSection>

        <BtnWrapper>
          {userInfo ? (
            <SignInButton onClick={handleLogout}>登出</SignInButton>
          ) : (
            <Link to="auth">
              <SignInButton>登入</SignInButton>
            </Link>
          )}
        </BtnWrapper>
      </DropDownMenu>
    </IconContainer>
  );
}
export default LoginDropDown;
