import styled from "styled-components";
import { flexCenter } from "./theme";
import { FaSearch } from "react-icons/fa";

export const HomeContainer = styled.div`
  width: 100%;
`;

export const CenterOfHome = styled.div`
  ${flexCenter}
  flex-direction:column;
  background-color: green;
  width: 100%;

  //可能不止需要40vh
  min-height: 40vh;
`;

export const AttributesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap; /* 允許換行 */
  align-items: center;
  justify-content: center;

  /* 初始狀態：三張卡片水平方向排列 */
  & > * {
    flex-basis: calc(33.33% - 1rem);
    margin: 0.5rem;
  }

  ${({ theme }) => theme.media.xl} {
    & > * {
      flex-basis: calc(50% - 1rem);
    }
  }

  /* 當視窗寬度小於 768px 時，讓卡片改為兩欄，剩下的卡片自動換行 */
  ${({ theme }) => theme.media.lg} {
    & > * {
      flex-basis: calc(50% - 1rem);
    }
  }

  /* 當視窗寬度小於 480px 時，將卡片改為垂直排列 */
  ${({ theme }) => theme.media.md} {
    flex-direction: column;

    & > * {
      flex-basis: 100%;
      margin: 0.5rem 0;
    }
  }
`;

// for product desc section
export const ProdDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  margin: 1rem 0;

  //rwd
  ${({ theme }) => theme.media.md} {
    flex-direction: column;
  }
`;

export const ImgWrapper = styled.div`
  flex: 3;
  min-width: 0;
`;

// 底層圖片hover效果

export const ImgHoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ImgHoverTitle = styled.h3`
  text-align: center;
  font-size: 3rem;
`;

export const ImgHoverBox = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ImgHoverWrapper = styled.div`
  flex: 2;

  position: relative;
  width: 300px;

  //高度應該是自訂的
  height: 500px;
  overflow: hidden;

  &::before {
    //寬度與高度未知
    content: "";
    position: absolute;
    inset: 0;
    //display: grid;
    place-content: center;
    background-size: cover;
    background-position: center;
    background-image: url("/cat-2.jpg");
    transition: filter 0.5s ease, transform 0.5s ease;
  }

  &:hover::before {
    filter: blur(4px);
    transform: scale(1.3);
  }
`;

export const ImgHover = styled.h1`
  position: relative;
  color: white;
  font-size: 5rem;
  text-align: center;
  line-height: 500px;
  pointer-events: none;
`;

export const TextWrapper = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background-color: #ebebeb;
  height: 500px;
  cursor: pointer;

  &:hover {
    background-color: #d6d6d6;
  }
`;

export const TextHover = styled.div``;
export const TextSearch = styled(FaSearch)``;
