import styled from "styled-components";

const BindBtn = ({ content, ...props }) => {
  return <FeatureBtn {...props}>{content}</FeatureBtn>;
};

const FeatureBtn = styled.button`
  padding: 15px 25px;
  border: 0;
  border-radius: 15px;

  color: ${({ theme }) => theme.colors.backGround};

  z-index: 1;

  background: ${({ theme }) => theme.colors.default};

  position: relative;
  font-weight: 1000;
  font-size: 17px;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  cursor: pointer;

  transition: all 250ms;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 0;
    width: 0;
    border-radius: 15px;

    background-color: ${({ theme }) => theme.spotLight.backGround};

    z-index: -1;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.default};

    &::before {
      width: 100%;
      top: 0;
      left: 0;
      height: 100%;
    }
  }
  &:active {
    transform: scale(80%);
  }
`;

export default BindBtn;
