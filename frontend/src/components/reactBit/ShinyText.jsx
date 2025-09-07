import styled, { keyframes, css } from "styled-components";

// 定義 shine 動畫
const shine = keyframes`
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
`;

// 使用 styled-components 創建樣式化的元件
const StyledShinyText = styled.div`
  color: #b5b5b5a4;
  //color: #666;

  //暗黑模式使用
  /* background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 60%
  ); */

  background: linear-gradient(
    120deg,
    rgba(0, 0, 255, 0) 40%,
    rgba(0, 0, 255, 0.8) 50%,
    rgba(0, 0, 255, 0) 60%
  );

  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  display: inline-block;

  /* 條件式動畫 */
  ${(props) =>
    !props.$disabled &&
    css`
      animation: ${shine} ${props.$speed}s linear infinite;
    `}

  font-size:3rem;
  font-weight: bolder;
`;

const ShinyText = ({
  text,
  disabled = false,
  speed = 3,
  className = "",
  ...props
}) => {
  return (
    <StyledShinyText
      $disabled={disabled}
      $speed={speed}
      className={className}
      {...props}
    >
      {text}
    </StyledShinyText>
  );
};

export default ShinyText;
