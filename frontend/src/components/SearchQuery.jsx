import { useState, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchProdQuery } from "../store/apis/prodApiSlice";

import {
  BriefRes,
  SearchContainer,
  GlobalSearchBackground,
  SearchBox,
  SearchForSearch,
  SearchInput,
  ResItem,
} from "../styles/SearchQuery.style";

const SearchQuery = forwardRef(function SearchQuery(_, ref) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useSearchProdQuery(keyword, {
    skip: keyword.trim() === "",
  });

  //console.log(data);

  function handleQuery(e) {
    e.preventDefault();
    //console.log("hello");

    if (keyword.trim()) {
      //toast.info("已觸發", { autoClose: 1000, position: "top-center" });
      navigate(`/search?query=${encodeURIComponent(keyword)}`);
    }
  }

  //console.log(keyword);

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
            onSubmit={handleQuery}
            ref={ref}
            key="box"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SearchForSearch />
            <SearchInput
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            {keyword && (
              <BriefRes>
                {isLoading ? (
                  <ResItem>搜尋中</ResItem>
                ) : (
                  <>
                    {data.slice(0, 5).map((item) => (
                      <ResItem key={item._id}>{item.name}</ResItem>
                    ))}

                    {data.length > 5 && (
                      <ResItem
                        to={`/search?query=${encodeURIComponent(keyword)}`}
                      >
                        更多內容...
                      </ResItem>
                    )}
                  </>
                )}
              </BriefRes>
            )}
          </SearchBox>
        </SearchContainer>
      </GlobalSearchBackground>
    </>
  );
});
export default SearchQuery;
