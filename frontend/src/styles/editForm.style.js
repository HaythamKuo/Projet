import styled from "styled-components";
import { FormBtn } from "./createProduct.style";

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-bottom: 2rem;
`;
export const EditFormBtn = styled(FormBtn)`
  width: 30%;
`;
