import styled from "styled-components";
import { flexCenter, flexContainer } from "./theme";
import { LayoutContainer } from "./layout.style";

export const NavContainer = styled.nav`
  /* ${flexContainer}
  
  height: 5rem;
  padding: 1rem 1rem;
  background-color: ${({ theme }) => theme.colors.backGround};
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10; */

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

    //ok?
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 clamp(1rem, 4vw, 4rem);
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 5rem;

    ${({ theme }) => theme.media.xl} {
      height: 4rem;
    }

    ${({ theme }) => theme.media.md} {
      justify-content: space-around;
    }
  }

  .logo {
    ${flexContainer}
    gap: 1rem;
    img {
      width: 3rem;
      height: 3rem;
    }
    span {
      font-size: 2rem;
    }
  }

  .navLinks {
    ${flexCenter}
    gap: 2rem;

    ${({ theme }) => theme.media.md} {
      display: none;
    }
    ${({ theme }) => theme.media.xl} {
      gap: 3rem;
    }
  }
  .mobile {
    display: none;
    ${({ theme }) => theme.media.md} {
      display: flex;
      font-size: 2rem;
      cursor: pointer;
      right: 3rem;
    }
  }
`;

export const MobileNav = styled.div`
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
  z-index: 1100;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
`;

//??
export const ContentContainer = styled(LayoutContainer)`
  padding-top: 6rem;
  //width: 100%;
  //flex: 1;
`;
