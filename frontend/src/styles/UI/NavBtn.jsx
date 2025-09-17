import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBtn = ({ name, ismobile, address }) => {
  return (
    <Btn as={Link} to={address} $ismobile={ismobile}>
      {name}
    </Btn>
  );
};

const Btn = styled.button`
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-size: ${({ $ismobile }) => ($ismobile ? "2rem" : "1rem")};
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
`;

export default NavBtn;
