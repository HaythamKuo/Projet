import styled from "styled-components";
import { Button } from "./ProdCard.style";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormBtn = styled(Button)`
  align-self: center;
  width: 30%;
`;
