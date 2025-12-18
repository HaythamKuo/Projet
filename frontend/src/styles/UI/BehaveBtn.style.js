import styled, { css } from "styled-components";

const BehaveBtn = styled.button.attrs({ type: "button" })`
  padding: 15px 25px;
  border: ${({ border }) => border || "unset"};
  border-radius: 15px;

  color: ${({ theme, hoverColor }) => theme.colors.backGround};
  z-index: 1;

  background: ${({ theme }) => theme.colors.default};
  position: relative;
  font-weight: 1000;
  font-size: 17px;
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  transition: all 250ms;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: ${({ beforeTop }) => beforeTop || "50%"};
    left: ${({ beforeLeft }) => beforeLeft || "50%"};
    height: ${({ beforeHeight }) => beforeHeight || "0"};
    width: ${({ beforeWidth }) => beforeWidth || "0"};
    border-radius: 15px;
    background-color: ${({ theme }) => theme.spotLight.backGround};
    z-index: -1;
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
  }

  &:hover {
    color: ${({ theme, hoverColor }) => hoverColor || theme.colors.default};

    &::before {
      width: 100%;
      top: 0;
      left: 0;
      height: 100%;
    }
  }

  &:active {
    transform: ${({ scaleOnClick }) => (scaleOnClick ? "scale(0.8)" : "none")};
  }

  ${({ custom }) => custom && css(custom)}
`;

export default BehaveBtn;
