import styled, { keyframes } from "styled-components";
import { FiX } from "react-icons/fi";
import { flexCenter, flexContainer, imgBasicStyle } from "./theme";

import EmptyCart from "../assets/emptyCart.svg?react";
import { FaHeart, FaRegTrashCan } from "react-icons/fa6";
import { SubmitBtn } from "./ProdImgGallery.style";

//控制overlay淡出/淡入
const fadeIn = keyframes`
from{opacity:0} to{opacity:1}`;

export const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;

  width: clamp(320px, 75vw, 500px);

  background-color: white;
  background-color: ${({ theme }) => theme.colors.backGround};
  transition: transform 0.3s ease-out;
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  z-index: 1000;

  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.md} {
    width: 100vw; /* 在手機模式下，寬度佔滿整個視窗 */
    /* *** 關鍵：不需要 left: 0，保持 right: 0 和 transform 邏輯一致 *** */
    /* top: 0; */ /* 已經在頂部定義，可省略 */
  }
`;

export const OverLay = styled.div`
  inset: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.4s ease;
  z-index: 990;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
`;

//從這邊開始為可重構內容

export const CartContainer = styled.div`
  z-index: 1;

  padding: 1rem;

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const CartTop = styled.div`
  ${flexContainer}
`;
export const CloseBtn = styled(FiX)`
  cursor: pointer;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.default};
`;
export const CartQuantity = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.default};

  h3 {
    font-size: 2rem;
    font-weight: bolder;
    margin-right: 1rem;
  }
  span {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.default};
    /* background-color: #f0f0f0; */
    background-color: ${({ theme }) => theme.card.specificBack};
    border-radius: 50%;
    padding: 0 10px;
  }
`;
export const CartCenter = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  border: 1px solid ${({ theme }) => theme.colors.default};
  border-radius: 4px;
`;

export const ItemsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.default};
  padding: 0.25rem;

  /* .thumbNailWrapper {
    flex: 1;
    width: 100%;
    overflow: hidden;
    border-radius: 2rem;
    padding: 0.5rem;

    img {
      ${imgBasicStyle}
    }
  }

  .influxInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 2;

    .influxInfo-top {
      display: flex;
      justify-content: space-between;

      color: ${({ theme }) => theme.colors.default};
    }
    .influxInfo-center {
      display: flex;
      gap: 1.5rem;
      & svg {
        cursor: pointer;
      }
    }

    .influxInfo-bottom {
      display: flex;
      justify-content: space-between;

      & .influxInfo-bottom_span {
        border: 1px solid grey;

        border-radius: 10px;
        padding: 10px;
        color: ${({ theme }) => theme.colors.default};
      }
    }
  } */
`;

//最下層
export const CartBottom = styled.div`
  margin-top: 1rem;
  .check {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .check-subtotal {
    display: flex;
    justify-content: space-between;

    span {
      font-weight: bolder;
      font-size: 1rem;
    }
  }
`;

export const CheckBtn = styled(SubmitBtn)`
  font-size: 1rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:active {
    transform: none;
  }
`;

export const DefaultBox = styled.div`
  /* height: 100%;
  top: 50%; */

  ${flexCenter}
  flex: ${({ $isFlex }) => ($isFlex ? 0 : 1)};
  flex-direction: column;
  gap: 1rem;
`;
export const NoProdSpan = styled.span`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.default};
`;

export const RemindToLoginSpan = styled.span`
  color: ${({ theme }) => theme.colors.default};
  font-weight: bold;
`;

// export const RemindToLoginBtn = styled.button.attrs({ type: "button" })``;

export const RemindToLoginBtn = styled(SubmitBtn)`
  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
  }
`;

export const NoProd = styled(EmptyCart)`
  width: 350px;
  height: 350px;
`;

export const IconBtn = styled.button.attrs({ type: "button" })`
  border: none;
  &:hover {
    background: none;
  }
`;

export const DeleteCart = styled(FaRegTrashCan)``;
export const CartToSave = styled(FaHeart)`
  color: ${({ $isSaved }) => $isSaved && "red"};
`;
