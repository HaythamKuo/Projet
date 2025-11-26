import styled, { keyframes, css } from "styled-components";
import { FaUser } from "react-icons/fa6";

export const IconContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const StateBox = styled.div`
  display: flex;
  justify-content: center;
  color: black;
  gap: 7px;
`;

export const UserIcon = styled(FaUser)`
  color: ${({ theme }) => theme.colors.default};
`;

export const UserState = styled.span`
  color: ${({ theme }) => theme.colors.default};
`;

const fadeInSlideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DropDownMenu = styled.div`
  position: absolute;
  top: 150%;
  left: -100%;

  width: 260px;
  //background-color: #fff;
  background-color: ${({ theme }) => theme.spotLight.border};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 100;

  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      animation: ${fadeInSlideDown} 0.18s ease-out;
    `}
`;

export const MenuSection = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  list-style: none;
  padding: 0;
  margin: 0;
`;
export const MenuItem = styled.li`
  margin: 0;
  padding: 1rem 4rem;
  color: black;
  //normal- black, dark- white
  color: ${({ theme }) => theme.colors.default};
  &:hover {
    background-color: #d8e1e9;
    border-radius: 1.5rem;
    color: black;
  }
`;

export const BtnWrapper = styled.div`
  padding: 12px 16px;
  text-align: center;
  border-top: 1px solid #eee;
`;
export const SignInButton = styled.button`
  background-color: #2ecc71;
  color: #fff;
  font-size: 0.95rem;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.18s ease;

  &:hover {
    background-color: #24b45f;
  }
`;
