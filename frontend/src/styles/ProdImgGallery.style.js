import styled from "styled-components";
import Image from "../components/Image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  MdDeliveryDining,
  MdHomeRepairService,
  MdSquareFoot,
} from "react-icons/md";

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
  /* width: 100%;
  max-width: 810px;
  overflow: hidden;
  aspect-ratio: 16/9; */
  width: 100%;

  //固定高度
  height: clamp(300px, 60vh, 700px);

  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  ${({ theme }) => theme.media.xxl} {
    height: clamp(300px, 45vh, 700px);
  }
  ${({ theme }) => theme.media.lg} {
    height: clamp(300px, 45vh, 700px);
  }
`;

export const SingleImgCard = styled.img`
  display: block;
  //max-width: 100%;
  width: auto;
  height: 100%;
  object-fit: cover;
`;

// 商品資訊
export const InfoPanel = styled.div`
  //flex: 1;
  display: flex;
  flex-direction: column;
`;
export const Top = styled.div`
  .prodTitle {
    font-size: 2rem;
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
    padding: 1rem 1.5rem;
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

export const Center = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid black;

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
    }
  }
`;

export const Bottom = styled.div``;

// Accordion
export const Section = styled.section`
  //background-color: red;
  //border-top: 1px solid #e0e0e0;
`;
export const Item = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

export const HeaderBtn = styled.button`
  width: 100%;
  padding: 1rem 0;
  font-size: 1rem;
  text-align: left;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const Icon = styled.span`
  display: inline-block;
  transition: transform 0.3s;
  transform: ${(prop) => (prop.open ? "rotate(45deg)" : "rotate(0)")};
`;

export const AccordionContent = styled.div`
  max-height: ${({ open }) => (open ? "500px" : "0")};
  //height: ${({ open }) => (open ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;
