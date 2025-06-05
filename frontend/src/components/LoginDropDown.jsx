import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
import { useSelector } from "react-redux";

function LoginDropDown() {
  const [openUser, setOpenUser] = useState(false);
  const closeTimeOut = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);

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
          <SignInButton>登入</SignInButton>
        </BtnWrapper>
      </DropDownMenu>
    </IconContainer>
  );
}
export default LoginDropDown;
