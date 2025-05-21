import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BreadLeftArrow } from "./Breadcrumb";

const DownArrow = styled(BreadLeftArrow)`
  transform: rotate(270deg);
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Toggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 30px 30px;
  background: #fff;
  cursor: pointer;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 200px;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Option = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

function QuantityAmount({ min = 1, max = 12, initial = 1, onChange }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(initial);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutSide);
    () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  function handleClick(value) {
    setQuantity(value);

    //如果有onChange的需求就會執行這段函式
    onChange && onChange(value);
    setOpen(false);
  }

  const optionLen = Array.from(
    { length: max - min + 1 },
    (_, index) => min + index
  );

  return (
    <Container ref={ref}>
      <Toggle onClick={() => setOpen((pre) => !pre)}>
        {quantity}
        <DownArrow />
      </Toggle>

      {open && (
        <Dropdown>
          {optionLen.map((opt) => (
            <Option key={opt} onClick={() => handleClick(opt)}>
              {opt}
            </Option>
          ))}
        </Dropdown>
      )}
    </Container>
  );
}
export default QuantityAmount;
