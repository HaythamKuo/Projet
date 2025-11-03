import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { flexCenter } from "./theme";
import { OverLay } from "./UI/ProcessLoader";
import { SearchIcon } from "./nav.style";
import { TiDelete } from "react-icons/ti";

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
export const DeleteIcon = styled(TiDelete)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.default};
  cursor: pointer;
`;

export const SearchBox = styled(motion.form)`
  ${flexCenter}
  background-color: white;
  background-color: ${({ theme }) => theme.spotLight.backGround};

  border-radius: 8px;
  padding: 1rem;
  position: relative;
  ${({ theme }) => theme.media.md} {
    width: 70%;
  }
`;

export const SearchInput = styled.input.attrs({
  type: "text",
  placeholder: "搜尋看看...",
})`
  border: none;
  width: 30rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.spotLight.backGround};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.default};

  &:hover {
    border: none;
  }

  &:focus {
    outline: none;
  }

  ${({ theme }) => theme.media.md} {
    width: 100%;
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
  background-color: ${({ theme }) => theme.spotLight.backGround};

  padding: 0 1rem;
  p {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  ${({ theme }) => theme.media.md} {
    width: 100%;
  }
`;
export const DeriveContent = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.default};
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
  color: ${({ theme }) => theme.colors.default};

  transition: background 0.2s ease;

  background-color: ${({ $isActive, theme }) =>
    $isActive && theme.card.specificBack};

  &:hover {
    background: #f5f5f5;
    background: ${({ theme }) => theme.card.specificBack};
  }
`;
