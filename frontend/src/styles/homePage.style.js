import styled from "styled-components";
import { flexCenter } from "./theme";

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
