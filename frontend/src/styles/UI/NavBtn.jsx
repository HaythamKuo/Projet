import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBtn = ({ name, ismobile, address, onClick, btn }) => {
  return (
    <Btn
      as={btn ? "button" : Link}
      to={address}
      $ismobile={ismobile}
      onClick={onClick}
    >
      {name}
    </Btn>
  );
};

const Btn = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.default};
  text-decoration: none;
  /* font-size: ${({ $ismobile }) => ($ismobile ? "2rem" : "1rem")}; */
  /* font-size: clamp(1.25rem, 0.8rem + 0.5vw, 1.25rem); */
  font-size: clamp(1rem, 0.8rem + 0.5vw, 1.25rem);
  border: none;
  background: none;
  font-weight: 600;

  &::before {
    margin-left: auto;
  }

  &::after,
  &::before {
    content: "";
    width: 0%;
    height: 2px;
    background: #f44336;
    display: block;
    transition: 0.5s;
  }

  &:hover::after,
  &:hover::before {
    width: 100%;
  }

  ${({ theme }) => theme.media.md} {
    border-radius: 10px;
    padding: 10px;
    &:hover {
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15),
        -5px -5px 10px rgba(255, 255, 255, 0.5);
    }

    &:active {
      box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2),
        inset -5px -5px 10px rgba(255, 255, 255, 0.5);
    }

    &::before {
      content: none;
    }
    &:hover::after,
    &:hover::before {
      width: 0;
    }
  }
`;

export default NavBtn;
