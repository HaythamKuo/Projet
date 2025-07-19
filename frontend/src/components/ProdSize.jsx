import { useState } from "react";
import styled from "styled-components";

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
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    border: 2px solid grey;
    border-radius: 1rem;
  }
`;

function ProdSize({ size, setSize }) {
  const [selectSize, setSelectSize] = useState("S");

  function handleSizeStock(e) {
    const newStock = +e.target.value || 0;

    setSize((pre) => ({
      ...pre,
      [selectSize]: newStock,
    }));
  }

  return (
    <div>
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
            type="text"
            value={size[selectSize]}
            onChange={handleSizeStock}
          />
        </InputSizeContainer>
      </div>
    </div>
  );
}
export default ProdSize;
