import styled from "styled-components";
// import { FormBtn } from "./createProduct.style";
import { SubmitBtn, CancelBtn } from "./ProdImgGallery.style";

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-bottom: 2rem;
`;

export const IdSpan = styled.span`
  color: ${({ theme }) => theme.colors.default};
  font-size: 1.5rem;
  font-weight: bold;
`;

export const BtnBox = styled.div`
  display: flex;
  gap: 2rem;
`;
export const EditFormBtn = styled(SubmitBtn)`
  /* width: 30%; */
`;

export const CancelFormBtn = styled(CancelBtn)``;
