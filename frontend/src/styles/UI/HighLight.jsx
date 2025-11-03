import { useEffect, useRef } from "react";
import styled from "styled-components";

// 建立一個背景容器，僅限於 navbar 下方（例如高度設定為剩餘視窗高度）
const BackgroundWrapper = styled.div`
  position: relative;
  //width: 100%;
  //flex: 3;
  //height: calc(100vh - 6rem); /* 假設 navbar 高度為 5rem */
  //height: 20vh; /* 假設 navbar 高度為 5rem */
  overflow: hidden;

  //test
  aspect-ratio: 1 / 1;
  max-width: 20vh; /* 不让宽度超过高度 */
  height: 20vh;
  border-radius: 50%;

  ${({ theme }) => theme.media.md} {
    min-height: 250px;

    min-height: 200px;
  }

  /* 定義自訂屬性，並讓它們支援過渡 */
  @property --x {
    syntax: "<length-percentage>";
    initial-value: 50vw;
    inherits: false;
  }
  @property --y {
    syntax: "<length-percentage>";
    initial-value: 50vh;
    inherits: false;
  }

  /* 背景定義：兩層漸變，第二層的中心位置依據 --x 與 --y */
  background: radial-gradient(closest-side, #777, #fff) 0/1em 1em space,
    radial-gradient(circle farthest-corner at var(--x) var(--y), #888, #fff);
  background-blend-mode: multiply;
  filter: contrast(16);
  transition: 0.35s cubic-bezier(0.1, 0, 0.5, 1.5);
  transition-property: --x, --y;
`;

export default function HightLight({ children }) {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bgRef.current) {
        bgRef.current.style.setProperty("--x", `${e.clientX}px`);
        bgRef.current.style.setProperty("--y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <BackgroundWrapper ref={bgRef}>{children}</BackgroundWrapper>;
}
