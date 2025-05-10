import styled from "styled-components";
import Image from "../components/Image";

export const Gallery = styled.div`
  display: flex;
  gap: 1rem;
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
  transition: border 0.2s ease, opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

// 主圖
export const MainImgWrapper = styled.div`
  flex: 1;
  max-width: 500px;
  width: 100%;
`;
