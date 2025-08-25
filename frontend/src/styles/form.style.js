import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 2rem;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  h1 {
    font-weight: 800;
    font-size: 2rem;
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    padding: 0.75rem;
    border: none;
    border-radius: 1rem;
    background: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;

  align-items: ${(props) => (props.$isCenter ? "center" : "")};

  ${(props) =>
    props.$firstPadding &&
    `&:first-child {
      padding: 10px 10px 10px 0;
    }`}

  label {
    font-size: 1rem;
    font-weight: bold;
  }
  input {
    padding: 1rem;
    border: 2px solid grey;
    border-radius: 1rem;

    //起始為0
    width: 35rem;
  }
`;

export const OptText = styled.p`
  font-size: 10px;
  text-align: center;

  cursor: pointer;
`;

export const ErrBox = styled.div``;
export const ErrMes = styled.p`
  color: blueviolet;
`;
