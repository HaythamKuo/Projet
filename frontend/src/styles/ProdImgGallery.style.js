import styled, { css } from "styled-components";
import { imgBasicStyle, flexCenter } from "./theme";

import { FaMinus, FaPlus } from "react-icons/fa6";

import { MdOutlineBrokenImage } from "react-icons/md";

export const GalleryContainer = styled.div``;

export const Gallery = styled.div`
  display: flex;
  gap: 1rem;

  ${({ theme }) => theme.media.md} {
    flex-direction: column;
  }
`;

//縮圖
export const ThumbnailList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  ${({ theme }) => theme.media.md} {
    flex-direction: row;
  }
`;

export const ThumbnailWrapper = styled.div`
  border-radius: ${(props) => props.borderRadius};
  cursor: pointer;
  width: 100px;
  height: 100px;
`;

const jointStyledThumbnail = css`
  opacity: ${({ $isActive }) => ($isActive ? "1" : "0.7")};

  width: 100%;
  height: 100%;
  display: block;

  border: ${({ $isActive, theme }) =>
    $isActive ? `2px solid ${theme.colors.default}` : "1px solid transparent"};

  transition: border 0.2s ease-out, opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

export const Thumbnail = styled.img`
  ${jointStyledThumbnail}
  object-fit: cover;
`;

export const DefaultImg = styled(MdOutlineBrokenImage)`
  ${jointStyledThumbnail}

  opacity: 0.4;
  filter: grayscale(100%);

  border-style: dashed;
`;

// 主圖
export const MainImgWrapper = styled.div`
  ${flexCenter}
  width: 90%;
  aspect-ratio: 4 / 3;

  //固定高度
  //height: clamp(300px, 60vh, 700px);

  overflow: hidden;
  border-radius: 1.5rem;

  ${({ theme }) => theme.media.xxl} {
    height: clamp(600px, 45vh, 900px);
  }
  ${({ theme }) => theme.media.lg} {
    height: clamp(300px, 45vh, 700px);
  }
`;

export const SingleImgCard = styled.img`
  ${imgBasicStyle}
`;

// 商品資訊
export const InfoPanel = styled.div`
  //flex: 1;
  display: flex;
  flex-direction: column;
`;
export const Top = styled.div``;

export const Prodtitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.default};
`;
export const ProdPrice = styled.span`
  font-weight: 800;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.default};
`;
export const ControlAmounts = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  gap: 1rem;

  span {
    background-color: azure;
    padding: 0.5rem 0.5rem;
    border-radius: 45px;
    font-size: 1.25rem;
  }

  button {
    border: none;
    border-radius: 50%;
    background-color: azure;
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1.25rem;
  }
`;

export const TopAmount = styled.div`
  p {
    margin-left: 7px;
    font-size: 1.5rem;
    font-weight: bolder;
    color: ${({ theme }) => theme.colors.default};
  }
`;
export const BottomAmount = styled.div`
  display: flex;
  justify-content: space-between;
`;

//感覺不是很必要
export const Plus = styled(FaPlus)``;
export const Minus = styled(FaMinus)``;

export const SubmitBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.spotLight.color};
  color: ${({ theme }) => theme.spotLight.border};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.button.hovers};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.97);
  }
`;
export const CancelBtn = styled(SubmitBtn)`
  background-color: ${({ theme }) => theme.card.backGround};
  color: ${({ theme }) => theme.colors.default};

  &:hover {
    background-color: ${({ theme }) => theme.spotLight.backGround};
  }
`;

export const Center = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.default};

  display: flex;
  flex-direction: column;
  gap: 1rem;

  .ProflieIcon {
    display: flex;
    align-items: center;
    gap: 15px;

    font-size: 1rem;
    font-weight: bolder;

    & > svg {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.default};
    }

    span {
      color: ${({ theme }) => theme.colors.default};
    }
  }
`;

export const Bottom = styled.div``;

//這裡是商品概括容器
export const HighlightSectionContainer = styled.div`
  margin-top: 1rem;
`;

//3個icon容器概述

export const BottomContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
`;
export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  //test
  flex: 1;
  min-width: 0;
`;
export const IconWrapper = styled.div`
  & > svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.default};
  }
`;

export const MinorTitle = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.colors.default};
`;
export const MinorDes = styled(MinorTitle).attrs({ as: "span" })`
  //test
  display: block; /* 變成 block，才能正確套用 max-width */
  max-width: 100%; /* 不超出父容器 */
  word-break: break-word; /* 必要時在單字內斷行 */
  white-space: normal; /* 確保自動換行 */
`;
