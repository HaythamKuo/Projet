import { useEffect, useState, forwardRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  const [activeIndex, setActiveIndex] = useState(-1);
  const [debounced, setDebounced] = useState("");

  const navigate = useNavigate();

  const { data = [], isLoading } = useSearchProdQuery(debounced, {
    skip: debounced.trim() === "",
  });

  const sliceItems = data?.slice(0, 5);

  //選項鍵盤事件
  const handleKeyDown = useCallback(
    (e) => {
      if (!data?.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setActiveIndex((pre) => (pre < sliceItems.length - 1 ? pre + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();

        setActiveIndex((pre) => (pre > 0 ? pre - 1 : sliceItems.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0) {
          const id = data[activeIndex]._id;
          navigate(`/products/${id}`);
        } else {
          navigate(`/search?query=${encodeURIComponent(keyword)}`);
        }
      }
    },
    [data, activeIndex, keyword, navigate, sliceItems]
  );

  //設置Debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(keyword);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  //設置active navigate特效
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  //console.log(data);

  function handleQuery(e) {
    e.preventDefault();

    if (keyword.trim()) {
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
              autoFocus
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            {keyword && (
              <BriefRes>
                {isLoading ? (
                  <ResItem>搜尋中</ResItem>
                ) : (
                  <>
                    {sliceItems.map((item, i) => (
                      <ResItem
                        onMouseEnter={() => setActiveIndex(i)}
                        key={item._id}
                        $isActive={activeIndex === i}
                      >
                        {item.name}
                      </ResItem>
                    ))}

                    {data.length > 5 && (
                      <ResItem
                        to={`/search?query=${encodeURIComponent(keyword)}`}
                        // onMouseEnter={() => setActiveIndex(6)}
                        // $isActive={activeIndex === sliceItems.length + 1}
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
