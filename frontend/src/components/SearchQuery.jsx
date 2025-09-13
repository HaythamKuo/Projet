//import {AnimatePresence} from'framer-motion'
import { forwardRef } from "react";

import {
  SearchContainer,
  GlobalSearchBackground,
  SearchBox,
  SearchForSearch,
  SearchInput,
} from "../styles/SearchQuery.style";

const SearchQuery = forwardRef(function SearchQuery(_, ref) {
  return (
    <>
      <GlobalSearchBackground
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SearchContainer>
          <SearchBox
            ref={ref}
            key="box"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SearchForSearch />
            <SearchInput />
          </SearchBox>
        </SearchContainer>
      </GlobalSearchBackground>
    </>
  );
});
export default SearchQuery;
