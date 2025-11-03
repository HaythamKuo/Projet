import styled from "styled-components";
import { TiDelete } from "react-icons/ti";
import { TbPencil } from "react-icons/tb";
import promptSvg from "../assets/shoud_upload.svg?react";
import { flexCenter, imgBasicStyle } from "./theme";
const ProdListContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const IconBox = styled.div`
  position: absolute;
  display: flex;
  gap: 5px;
  flex-direction: column;

  top: 6px;
  right: 6px;
  z-index: 10;

  & svg {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    font-size: 1.5rem;
  }
`;

const Delete = styled(TiDelete)``;
const Edit = styled(TbPencil)`
  color: black;
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 0 0 calc(20% - 0.8rem);

  //5
  ${({ theme }) => theme.media.xxl} {
    flex: 0 0 calc(20% - 0.8rem);
  }

  //4
  ${({ theme }) => theme.media.xl} {
    flex: 0 0 calc(25% - 0.75rem);
  }

  //3
  ${({ theme }) => theme.media.lg} {
    flex: 0 0 calc(33.333% - 0.67rem);
  }

  //2
  ${({ theme }) => theme.media.md} {
    flex: 0 0 calc(50% - 0.5rem);

    /* height: 500px; */
  }
`;

const MyImgWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  aspect-ratio: 16/9;
`;

const MyImg = styled.img`
  ${imgBasicStyle}
`;

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${flexCenter}
  gap: 2rem;

  ${({ theme }) => theme.media.md} {
    flex-direction: column-reverse;
    /* gap: 1rem; */
  }
`;

const PromptProd = styled(promptSvg)`
  width: 300px;
  height: 300px;
  align-self: center;
`;

export {
  MyImg,
  ImageWrapper,
  Delete,
  Edit,
  IconBox,
  ProdListContainer,
  EmptyWrapper,
  PromptProd,
  MyImgWrapper,
};
