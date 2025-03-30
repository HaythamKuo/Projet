import styled from "styled-components";

const NavBtn = ({ name, ismobile }) => {
  return (
    <StyledWrapper $isMobile={ismobile}>
      <button>{name}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    cursor: pointer;
    color: black;
    text-decoration: none;
    font-size: 20px;
    font-size: ${({ isMobile }) => (isMobile ? "2rem" : "1rem")};
    border: none;
    background: none;
    font-weight: 600;
  }

  button::before {
    margin-left: auto;
  }

  button::after,
  button::before {
    content: "";
    width: 0%;
    height: 2px;
    background: #f44336;
    display: block;
    transition: 0.5s;
  }

  button:hover::after,
  button:hover::before {
    width: 100%;
  }
`;

export default NavBtn;
