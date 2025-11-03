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

const StyledShinyText = styled.div`
  color: #b5b5b5a4;

  background: ${({ theme }) => theme.colors.gradientColor};

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

  ${({ theme }) => theme.media.md} {
    font-size: 2rem;
  }
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
