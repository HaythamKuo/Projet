import { useRef } from "react";
import styled from "styled-components";

// 透過 styled-components 建立包含 ::before 偽元素的卡片樣式
const CardSpotlight = styled.div`
  position: relative;
  flex: 1;
  height: 350px;

  //test
  width: 40%;
  min-width: 0;

  border-radius: 1.5rem;
  border: 1px solid ${({ theme }) => theme.spotLight.border};
  background-color: ${({ theme }) => theme.spotLight.backGround};
  color: ${({ theme }) => theme.spotLight.color};
  padding: 2rem;
  overflow-y: auto;

  ${({ theme }) => theme.media.md} {
    width: 100%; // 垂直排列時保持一致寬度
    max-width: 660px; // 最大寬度限制
  }

  /* 預設 CSS 變數 */
  --mouse-x: 50%;
  --mouse-y: 50%;
  //--spotlight-color: rgba(255, 255, 255, 0.05);
  --spotlight-color: ${({ theme }) => theme.spotLight.spotColor}||rgba
    (0, 229, 255, 0.2);

  /* 偽元素 ::before */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      var(--spotlight-color),
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  /* 滑鼠 hover 或 focus-within 狀態下偽元素透明度 */
  &:hover::before,
  &:focus-within::before {
    opacity: 0.6;
  }
`;

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor,
  ...rest
}) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // 設定 CSS 變數
    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <CardSpotlight
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={className}
      {...rest}
    >
      {children}
    </CardSpotlight>
  );
};

export default SpotlightCard;
