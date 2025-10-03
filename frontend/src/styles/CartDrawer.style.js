import styled, { keyframes } from "styled-components";
import { FiX } from "react-icons/fi";
import { flexCenter, flexContainer, imgBasicStyle } from "./theme";

import noProdSvg from "../assets/noprodhere.svg?react";
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
  transition: transform 0.3s ease-out;
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  z-index: 1000;

  display: flex;
  flex-direction: column;
`;

export const OverLay = styled.div`
  inset: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.4s ease;
  z-index: 990;
`;

//從這邊開始為可重構內容

export const CartContainer = styled.div`
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
`;
export const CartQuantity = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-size: 2rem;
    font-weight: bolder;
    margin-right: 1rem;
  }
  span {
    font-size: 1.5rem;
    color: black;
    background-color: #f0f0f0;
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

  border: 1px solid ${({ theme }) => theme.default};
  border-radius: 4px;
`;

export const ItemsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid black;

  //padding-bottom: 1rem;
  //margin-bottom: 1rem;
  padding-right: 1rem;

  .thumbNailWrapper {
    flex: 1;
    width: 100%;
    overflow: hidden;
    border-radius: 2rem;
    padding: 0.5rem;

    img {
      ${imgBasicStyle}/* display: block;
      width: 100%;
      height: 100%;
      object-fit: cover; */
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
      //background-color: green;
    }
    .influxInfo-center {
      display: flex;
      gap: 1.5rem;
      & svg {
        cursor: pointer;
      }
    }

    .influxInfo-bottom {
      //background-color: yellow;
      display: flex;
      justify-content: space-between;

      & .influxInfo-bottom_span {
        border: 1px solid grey;
        border-radius: 10px;
        padding: 10px;
      }
    }
  }
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
`;
export const NoProdSpan = styled.span`
  font-size: 2rem;
`;

export const RemindToLoginSpan = styled.span``;

export const RemindToLoginBtn = styled.button.attrs({ type: "button" })``;

export const NoProd = styled(noProdSvg)`
  width: 300px;
  height: 300px;
`;

export const IconBtn = styled.button.attrs({ type: "button" })`
  border: none;
  background-color: white;
`;

export const DeleteCart = styled(FaRegTrashCan)``;
export const CartToSave = styled(FaHeart)``;
