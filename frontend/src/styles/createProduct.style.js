import styled from "styled-components";
import { SubmitBtn } from "./ProdImgGallery.style";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-bottom: 2rem;
`;

export const FormBtn = styled(SubmitBtn)`
  align-self: center;
  width: 30%;
`;

export const BtnBox = styled.div`
  display: flex;
  gap: 5rem;
`;
