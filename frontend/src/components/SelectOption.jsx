import { useState, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import useClickOutside from "../hooks/useClickOutside";
import { useFetchCategoriesQuery } from "../store/apis/prodApiSlice";

const Container = styled.div`
  position: relative;
  width: 200px;
  margin-top: 10px;
`;
const SelectButton = styled.button.attrs({ type: "button" })`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  text-align: left;
  cursor: pointer;

  margin: 10px 0 0 0;
`;

const SelectSpan = styled.span`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.default};
`;

export const Arrow = styled(MdOutlineKeyboardArrowRight)`
  transition: transform 0.25s ease;
  transform-origin: center;
  transform: rotate(${(p) => (p.$rottate ? "90deg" : "0deg")});
`;

const Dropdown = styled(motion.ul)`
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Option = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 },
  },
};

function SelectOption({ category, setCategory, subCategory, setSubCategory }) {
  const [mainOpen, setMainOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  const mainOpenRef = useRef();
  const subOpenRef = useRef();

  useClickOutside(mainOpenRef, () => setMainOpen(false));
  useClickOutside(subOpenRef, () => setSubOpen(false));

  function handleCategory(option) {
    setCategory(option.id);
    setSubCategory(null);
    setMainOpen(false);
  }

  function handleSubCategory(option) {
    setSubCategory(option);
    setSubOpen(false);
  }

  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useFetchCategoriesQuery();

  //catagory是id
  const designatedCategory = categories.find((attrs) => attrs.id === category);
  const designatedSubCategory = designatedCategory?.subCategory || [];

  if (isLoading) return <p>載入中</p>;
  if (isError) return <p> {error?.error} </p>;

  return (
    <>
      <Container ref={mainOpenRef}>
        <SelectSpan>主要屬性</SelectSpan>
        <SelectButton onClick={() => setMainOpen((pre) => !pre)}>
          {designatedCategory?.label || "請選擇"}
          <Arrow $rottate={mainOpen} />
        </SelectButton>
        <AnimatePresence>
          {mainOpen && (
            <Dropdown
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
            >
              {categories.map((option) => (
                <Option key={option.id} onClick={() => handleCategory(option)}>
                  {option.label}
                </Option>
              ))}
            </Dropdown>
          )}
        </AnimatePresence>
      </Container>
      <Container ref={subOpenRef}>
        <SelectSpan>子屬性</SelectSpan>
        <SelectButton onClick={() => setSubOpen((pre) => !pre)}>
          <span>{subCategory || "請選擇"}</span>
          <Arrow $rottate={subOpen} />
        </SelectButton>
        <AnimatePresence>
          {subOpen && (
            <Dropdown
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
            >
              {designatedSubCategory.map((option) => (
                <Option
                  key={`${designatedCategory.id}-${option}`}
                  onClick={() => handleSubCategory(option)}
                >
                  {option}
                </Option>
              ))}
            </Dropdown>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
}
export default SelectOption;
