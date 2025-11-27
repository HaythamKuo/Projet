import styled, { css } from "styled-components";

import { flexCenter, flexContainer, imgBasicStyle } from "./theme";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";

export const NavContainer = styled.nav`
  //ok?
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.backGround};

  box-shadow: ${({ theme }) => theme.colors.boxShadow};

  .navContent {
    /* ${flexContainer}
    width: 100%;

    //限制nav兩側最大寬度
    max-width: 1200px;
    margin: 0 auto; */

    //這裡版面之後確定沒有問題可以繼承 LayoutContainer
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 clamp(1rem, 4vw, 4rem);

    display: flex;
    align-items: center;

    flex: 1;

    height: 5rem;

    ${({ theme }) => theme.media.xxl} {
      padding: 0 16rem;
    }

    ${({ theme }) => theme.media.xl} {
      height: 4rem;
      padding: 0 8rem;
    }
    ${(props) => props.theme.media.lg} {
      padding: 0 4rem;
    }

    ${({ theme }) => theme.media.md} {
      justify-content: space-between;
      flex: 0;
      padding: 0 2rem;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      /* font-size: 2rem; */
    }

    ${({ theme }) => theme.media.lg} {
      /* margin-right: 1rem; */
    }
  }

  .navLinks {
    ${flexCenter}
    justify-content:flex-end;
    gap: 2rem;
    flex: 2;

    ${({ theme }) => theme.media.md} {
      display: none;
    }
    ${({ theme }) => theme.media.xl} {
      gap: 3rem;
    }
    ${({ theme }) => theme.media.lg} {
      gap: 0.5rem;
      justify-content: space-around;
    }
  }
  .mobile {
    display: none;
    ${({ theme }) => theme.media.md} {
      display: flex;
      font-size: 2rem;
      /* right: 3rem; */
    }
  }
  .mobileSearch {
    display: none;
    ${({ theme }) => theme.media.md} {
      display: flex;
    }
  }
`;

export const Sentinel = styled.div`
  position: sticky;
  height: 1px;
  top: 5rem;
  background-color: blue;
`;

export const MobileNav = styled.div`
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

export const IconContainer = styled.div`
  width: 100%;
  max-width: 200px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  justify-content: ${({ $position }) => !$position && "flex-end"};
  position: relative;
`;

const refactorIconStyle = css`
  font-size: 1.25rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.default};
`;
export const CartIcon = styled(FaShoppingCart)`
  ${refactorIconStyle}
`;

export const SearchIcon = styled(FaSearch)`
  ${refactorIconStyle}
`;
export const SideBar = styled(FaAlignJustify)`
  color: ${({ theme }) => theme.colors.default};
`;
export const CloseSideBar = styled(FaXmark)`
  color: ${({ theme }) => theme.colors.default};
`;

export const LogoWrapper = styled.div`
  height: 5rem; /* 與 navbar 一致 */
  width: auto; /* 自動依照 logo 寬度 */
  aspect-ratio: 1 / 1;
  aspect-ratio: 16 / 9;
  max-height: 100%;
  overflow: hidden;
`;
export const Logo = styled.img`
  ${imgBasicStyle}
`;
