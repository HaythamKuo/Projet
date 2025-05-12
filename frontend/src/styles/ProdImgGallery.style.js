import styled from "styled-components";
import Image from "../components/Image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  MdDeliveryDining,
  MdHomeRepairService,
  MdSquareFoot,
} from "react-icons/md";

export const Gallery = styled.div`
  display: flex;
  gap: 1rem;
  //background-color: yellow;

  //將content縮小置中？
  //padding: 0 20rem;
`;

//縮圖
export const ThumbnailList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

export const ThumbnailWrapper = styled.div`
  border-radius: ${(props) => props.borderRadius};
  cursor: pointer;
`;

export const Thumbnail = styled(Image)`
  opacity: ${({ $isActive }) => ($isActive ? "1" : "0.7")};

  border: ${({ $isActive, theme }) =>
    $isActive ? `2px solid ${theme.colors.primary}` : "1px solid transparent"};
  transition: border 0.2s ease-out, opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

// 主圖
export const MainImgWrapper = styled.div`
  flex: 1;
  /* max-width: 500px; */
  //width: 100%;
`;

// 商品資訊
export const InfoPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export const Top = styled.div`
  .prodTitle {
    font-size: 3rem;
    font-weight: bold;
  }

  .prodPrice {
    font-weight: 800;
    font-size: 1.75rem;
  }
`;

export const ControlAmounts = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    background-color: azure;
    padding: 1rem 2.75rem;
    border-radius: 45px;
    font-size: 1.25rem;
  }

  button {
    border: none;
    border-radius: 75%;
    background-color: azure;
    padding: 1rem;
    cursor: pointer;
    font-size: 1.25rem;
  }
`;

//感覺不是很必要
export const Plus = styled(FaPlus)``;
export const Minus = styled(FaMinus)``;

export const SubmitBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  //test
  //width: 50%;
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

export const Center = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid black;

  display: flex;
  flex-direction: column;

  .ProflieIcon {
    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 1.25rem;
    font-weight: bolder;

    & > svg {
      font-size: 1.5rem;
    }
  }
`;

export const Bottom = styled.div``;
