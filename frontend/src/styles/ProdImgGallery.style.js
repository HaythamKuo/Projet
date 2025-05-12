import styled from "styled-components";
import Image from "../components/Image";
import { FaMinus, FaPlus } from "react-icons/fa6";

export const Gallery = styled.div`
  display: flex;
  gap: 1rem;
  //background-color: yellow;

  //將content縮小置中？
  padding: 0 1rem;
`;

//縮圖
export const ThumbnailList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

export const ThumbnailWrapper = styled.div`
  padding: 2px;
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
    background-color: darkcyan;
    padding: 1rem 1.75rem;
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

export const Plus = styled(FaPlus)``;
export const Minus = styled(FaMinus)``;

export const Center = styled.div``;
export const Bottom = styled.div``;
