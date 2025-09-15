import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { flexCenter } from "./theme";
import { OverLay } from "./UI/ProcessLoader";
import { SearchIcon } from "./nav.style";

export const SearchContainer = styled.div`
  ${flexCenter}
  z-index:1000;
  margin-bottom: 45rem;
`;

export const SearchForSearch = styled(SearchIcon)`
  font-size: 1.5rem;
  //color: red;
  cursor: default;
  margin-right: 10px;
`;

export const SearchBox = styled(motion.form)`
  ${flexCenter}
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  position: relative;
`;

export const SearchInput = styled.input.attrs({
  type: "text",
  placeholder: "搜尋看看...",
})`
  border: none;
  width: 30rem;
  height: 2.5rem;

  font-size: 2.5rem;

  &:hover {
    border: none;
  }

  &:focus {
    outline: none;
  }
`;

export const GlobalSearchBackground = styled(OverLay).attrs({ as: motion.div })`
  padding-top: 80px;
  /* justify-content: center;
  align-items: flex-start; */
`;

export const BriefRes = styled.div`
  position: absolute;

  width: 34rem;
  margin-top: 0.25rem;
  border-radius: 8px;

  top: 100%;
  background-color: white;

  padding: 0 1rem;
  p {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
`;
export const DeriveContent = styled.p`
  font-size: 1rem;
  color: black;
`;

export const ResItem = styled(Link)`
  display: block; /* 讓 <a> 撐滿整行 */
  font-size: 1.5rem;
  margin: 0.25rem 0;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none; /* 移除預設下劃線 */
  color: inherit; /* 繼承文字顏色 */

  transition: background 0.2s ease;

  background-color: ${({ $isActive }) => $isActive && "#f5f5f5"};

  &:hover {
    background: #f5f5f5;
  }
`;
