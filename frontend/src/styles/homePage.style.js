import styled from "styled-components";
import { flexCenter, imgBasicStyle } from "./theme";
import { FaSearch } from "react-icons/fa";

export const HomeContainer = styled.div`
  width: 100%;
`;

export const CenterOfHome = styled.div`
  ${flexCenter}
  flex-direction:column;
  /* background-color: green; */
  width: 100%;

  //可能不止需要40vh
  min-height: 40vh;
`;

export const AttributesContainer = styled.div`
  width: 100%;
  ${flexCenter}
  flex-wrap: wrap; /* 允許換行 */

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
  justify-content: space-around;
  align-items: stretch;

  gap: 1rem;
  margin: 1rem 0;

  //rwd
  ${({ theme }) => theme.media.md} {
    flex-direction: column;
  }
`;

export const ImgWrapper = styled.div`
  flex: 3;

  width: 100%;
  box-shadow: ${({ theme }) => theme.colors.specificShadow};

  overflow: hidden;
  border-radius: 0.75rem;

  ${({ theme }) => theme.media.xxl} {
    width: 100%;
    height: auto;
  }
`;

export const ImgInstance = styled.img`
  ${imgBasicStyle}
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

export const RwdBox = styled.div`
  display: flex;
  gap: 1rem;
  flex: 4;
  ${({ theme }) => theme.media.md} {
    /* display: flex; */
    flex-direction: column;
    width: 100%;
  }
`;

export const ImgHoverBox = styled.div`
  display: flex;
  gap: 1rem;

  ${(props) => props.theme.media.lg} {
    /* padding: 0 4rem; */
    flex-direction: column;
  }

  ${({ theme }) => theme.media.md} {
    padding: 0;
  }
`;

export const ImgHoverWrapper = styled.div`
  ${flexCenter}
  position: relative;
  border-radius: 0.75rem;
  flex: 2;
  box-shadow: ${({ theme }) => theme.colors.specificShadow};

  width: 300px;

  ${({ theme }) => theme.media.md} {
    width: 100%;
  }
  //高度應該是自訂的
  height: 500px;
  overflow: hidden;
  aspect-ratio: 16 / 9;

  &::before {
    content: "";
    position: absolute;
    inset: 0;

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

  pointer-events: none;
`;

export const TextWrapper = styled.div`
  ${flexCenter}
  border-radius: 0.75rem;
  flex: 1;

  gap: 10px;

  background-color: ${({ theme }) => theme.colors.convertBeige};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.button.hoverSearch};
  }

  ${(props) => props.theme.media.lg} {
    height: auto;
    min-height: 150px;
  }
  ${({ theme }) => theme.media.md} {
    min-height: 100px;
    width: 100%;
  }
`;

export const TextHover = styled.span`
  color: ${({ theme }) => theme.spotLight.color};
  font-weight: bold;
`;
export const TextSearch = styled(FaSearch)`
  color: ${({ theme }) => theme.spotLight.color};
`;
