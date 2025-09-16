import styled from "styled-components";
import { imgBasicStyle } from "./theme";
import { SubmitBtn } from "./ProdImgGallery.style";
import { FaRegBookmark, FaCartShopping } from "react-icons/fa6";

export const SearchContainer = styled.div``;

export const SpecificTar = styled.span`
  font-weight: bold;
  font-size: 2rem;
`;
export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;

  display: flex;

  flex-direction: column;
  background-color: white;
`;

export const ImgWrapper = styled.div`
  /* width: 100%;
  height: 300px; */
  aspect-ratio: 16/9;
`;
export const Img = styled.img`
  ${imgBasicStyle}
`;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: min(10px, 4%);
`;

export const ProdName = styled.h3`
  color: red;
  font-size: 2rem;
`;

export const InfoCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 1.75rem;
    font-weight: bolder;
  }
`;

export const InfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
  //background-color: rebeccapurple;
`;
export const GoIoProd = styled(SubmitBtn)`
  flex: 1;
`;
export const IconBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  flex: 2;
  /* flex: 1; */
`;

export const Cart = styled(FaCartShopping)`
  font-size: 1.5rem;
  cursor: pointer;
  //margin-left: 2rem;
`;
export const BookMark = styled(FaRegBookmark)`
  font-size: 1.5rem;
  cursor: pointer;
`;
