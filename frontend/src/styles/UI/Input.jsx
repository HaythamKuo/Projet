import { useState } from "react";
import styled from "styled-components";
import { FiSearch, FiSend } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// 容器：水平排列 icon 與輸入框
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

// icon 外層包裝，確保動畫順暢
const IconWrapper = styled(motion.span)`
  display: flex;
  position: absolute;
  left: 7px;
`;

// 使用 attrs() 設定預設 prop
const StyledInput = styled.input.attrs({
  type: "text",
  name: "text",
  placeholder: "搜尋品項",
})`
  display: block;
  color: rgb(34, 34, 34);
  background: linear-gradient(
    142.99deg,
    rgba(217, 217, 217, 0.63) 15.53%,
    rgba(243, 243, 243, 0.63) 88.19%
  );
  box-shadow: 0px 12px 24px -1px rgba(0, 0, 0, 0.18);
  border: none;
  border-radius: 50px;
  height: 30px;
  margin: 7px 0;
  padding: 18px 15px 18px 40px; /* 留出空間給絕對定位的 icon */
  outline: none;
  text-align: center;
  width: ${(prop) => prop.$width || "200px"};
  transition: width 0.5s;

  &:hover {
    width: ${(prop) => prop.$hoverwidth || "240px"};
  }

  &:focus {
    width: ${(prop) => prop.$focuswidth || "280px"};
  }
`;

const Input = ({ width, hoverWidth, focusWidth }) => {
  const [focused, setFocused] = useState(false);

  return (
    <Container>
      <AnimatePresence mode="wait" initial={false}>
        {focused ? (
          <IconWrapper
            key="send"
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FiSend size={20} />
          </IconWrapper>
        ) : (
          <IconWrapper
            key="search"
            initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FiSearch size={20} />
          </IconWrapper>
        )}
      </AnimatePresence>
      <StyledInput
        $width={width}
        $hoverwidth={hoverWidth}
        $focuswidth={focusWidth}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button>搜尋</button>
    </Container>
  );
};

export default Input;
