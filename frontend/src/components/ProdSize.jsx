import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 1.5rem;
`;

const SizeLabel = styled.span`
  margin: 0 1rem;
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 50%;
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};

  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};

  &:first-child {
    margin: 0 1rem 0 0;
  }
`;

const InputSizeContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    font-size: 20px;
    font-weight: bold;
  }

  input {
    border: 2px solid grey;
    border-radius: 1rem;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* 針對 Firefox */
    -moz-appearance: textfield;
  }
`;

function ProdSize({ size, setSize }) {
  const [selectSize, setSelectSize] = useState("S");

  function handleSizeStock(e) {
    const value = e.target.value;

    const newStock = value === "" ? "" : parseInt(value, 10);

    if (value === "" || (!isNaN(newStock) && newStock >= 0)) {
      setSize((pre) => ({
        ...pre,
        [selectSize]: newStock,
      }));
    }
  }

  return (
    <Container>
      <div>
        {["S", "M", "L"].map((label) => (
          <SizeLabel
            $isActive={selectSize === label}
            key={label}
            onClick={() => setSelectSize(label)}
          >
            {label}
          </SizeLabel>
        ))}
        <InputSizeContainer>
          <label>{selectSize}的庫存</label>
          <input
            type="number"
            value={size[selectSize] ?? ""}
            onChange={handleSizeStock}
          />
        </InputSizeContainer>
      </div>
    </Container>
  );
}
export default ProdSize;
