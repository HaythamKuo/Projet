import styled from "styled-components";
import { motion } from "framer-motion";

import { flexCenter } from "./theme";
import { OverLay } from "./UI/ProcessLoader";
import { SearchIcon } from "./nav.style";

export const SearchContainer = styled.div``;

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
  position: absolute;
  top: 20%;
`;

export const SearchInput = styled.input.attrs({
  type: "search",
  placeholder: "搜尋看看...",
})`
  border: none;
  width: 30rem;
  height: 2.5rem;

  font-size: 1.5rem;

  &:hover {
    border: none;
  }

  &:focus {
    outline: none;
  }
`;

// export const GlobalSearchBackground = styled(OverLay)``;
export const GlobalSearchBackground = styled(OverLay).attrs({ as: motion.div })`
  padding-top: 80px;
  /* justify-content: center;
  align-items: flex-start; */
`;
