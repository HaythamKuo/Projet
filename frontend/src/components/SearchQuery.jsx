import { useMemo, useEffect, useState, forwardRef, useCallback } from "react";
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
  DeleteIcon,
} from "../styles/SearchQuery.style";

const SearchQuery = forwardRef(function SearchQuery(_, ref) {
  const [keyword, setKeyword] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [debounced, setDebounced] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();

  const { data: rawData, isLoading } = useSearchProdQuery(debounced, {
    skip: debounced.trim() === "",
  });

  const data = useMemo(
    () => (Array.isArray(rawData) ? rawData : []),
    [rawData]
  );

  const sliceItems = data?.slice(0, 5);
  const totalOptions = sliceItems.length + (data.length > 5 ? 1 : 0);

  //選項鍵盤事件
  const handleKeyDown = useCallback(
    (e) => {
      if (!data?.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setActiveIndex((pre) => (pre < totalOptions - 1 ? pre + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();

        setActiveIndex((pre) => (pre > 0 ? pre - 1 : totalOptions - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();

        // 先處理「更多內容」：必須比 sliceItems 的判斷更優先
        if (activeIndex === sliceItems.length && data.length > 5) {
          navigate(`/search?query=${encodeURIComponent(keyword)}`);
          return;
        }

        // 產品項目
        if (activeIndex >= 0 && activeIndex < sliceItems.length) {
          const id = sliceItems[activeIndex]._id; // **改用 sliceItems 而不是 data**
          navigate(`/products/${id}`);
          return;
        }

        // 沒有選任何項目
        navigate(`/search?query=${encodeURIComponent(keyword)}`);
      }
    },
    [data, activeIndex, keyword, navigate, sliceItems, totalOptions]
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

  // 只要請求結束就把 isSearched 設為 true
  useEffect(() => {
    if (!isLoading && debounced.trim()) {
      setIsSearched(true);
    }
  }, [isLoading, debounced]);

  //console.log(data);

  //刪除字句且重置isSearched
  function resetKeyWord() {
    setIsSearched(false);
    setKeyword("");
  }

  function handleQuery(e) {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search?query=${encodeURIComponent(keyword)}`);
    }
  }

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
            {keyword && <DeleteIcon onClick={() => resetKeyWord()} />}
            {keyword && (
              <BriefRes>
                {isLoading ? (
                  <ResItem>搜尋中</ResItem>
                ) : (
                  <>
                    {isSearched && sliceItems.length === 0 && "看來是沒有東西"}
                    {sliceItems.map((item, i) => (
                      <ResItem
                        onMouseEnter={() => setActiveIndex(i)}
                        key={item._id}
                        $isActive={activeIndex === i}
                        to={`/products/${item._id}`}
                      >
                        {item.name}
                      </ResItem>
                    ))}

                    {data.length > 5 && (
                      <ResItem
                        to={`/search?query=${encodeURIComponent(keyword)}`}
                        onMouseEnter={() => setActiveIndex(sliceItems.length)}
                        $isActive={activeIndex === sliceItems.length}
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
