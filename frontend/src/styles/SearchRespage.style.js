import styled from "styled-components";
import { flexCenter } from "./theme";

import { SubmitBtn, CancelBtn } from "./ProdImgGallery.style";

export const SearchContainer = styled.div``;

export const SpecificTar = styled.span`
  font-weight: bold;
  font-size: 2rem;
`;
export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const Nothing = styled.div`
  ${flexCenter}
  flex-direction: column;
  gap: 2rem;
  //background-color: aqua;
`;
export const Wrapper = styled.div`
  background-color: white;
  border-radius: 50%;
  padding: min(0.5em, 6%);
`;
export const RemindTitle = styled.h3`
  color: black;
  font-size: 2rem;
  font-weight: bold;
`;

export const ProdPage = styled(SubmitBtn)``;
export const HomePage = styled(CancelBtn)``;
