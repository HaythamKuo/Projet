import styled from "styled-components";
import { flexContainer } from "./theme";

export const NavContainer = styled.nav`
  ${flexContainer}
  width: 100%;
  height: 5rem;
  padding: 1rem 1rem;
  background-color: ${({ theme }) => theme.colors.backGround};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .navContent {
    ${flexContainer}
    width: 100%;

    //限制nav兩側最大寬度
    max-width: 1200px;
    margin: 0 auto;

    ${({ theme }) => theme.media.md} {
      height: 4rem;
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
    display: none;

    ${({ theme }) => theme.media.md} {
      display: flex;
      gap: 2rem;
      align-items: center;
      justify-content: center;
    }
  }

  .mobile {
    display: flex;
    font-size: 2rem;
    cursor: pointer;

    ${({ theme }) => theme.media.md} {
      display: none;
    }
  }

  .desktop {
    display: none;
    ${({ theme }) => theme.media.md} {
      display: flex;
    }
  }
`;
export const MobileNav = styled.div`
  background-color: blueviolet;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5rem;
  transition: right 0.3s ease-in-out;
  right: ${({ open }) => (open ? "0" : "-100%")};
`;
