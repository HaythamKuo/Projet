import { useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useSearchProdQuery } from "../store/apis/prodApiSlice";

import {
  SearchContainer,
  SpecificTar,
  FilterContainer,
  Nothing,
  Wrapper,
  HomePage,
  ProdPage,
  RemindTitle,
  SpecificRes,
} from "../styles/SearchRespage.style";
import RefactorCard from "../styles/UI/RefactorCard";
import ProcessLoader from "../styles/UI/ProcessLoader";
import Breadcrumb from "../styles/UI/Breadcrumb";

function SearchRespage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const saftyQuery = query?.trim() || "";
  const { data: products = [], isLoading } = useSearchProdQuery(query, {
    skip: saftyQuery === "",
  });

  useEffect(() => {
    if (!query) navigate("/products");
    return;
    //toast.warn("誤入歧途，要有關鍵字才能進來", { autoClose: 1500 });
  }, [navigate, query]);

  if (isLoading) return <ProcessLoader />;

  return (
    <SearchContainer>
      <Breadcrumb />
      <SpecificRes>
        搜尋結果" <SpecificTar>{query}</SpecificTar> "
      </SpecificRes>
      {products.length ? (
        <FilterContainer>
          {products.map((item) => (
            <RefactorCard
              key={item._id}
              id={item._id}
              src={item?.images[0]?.url}
              alt={item?.images[0]?.alt}
              name={item.name}
              price={item.price}
              rating={item.rate}
              query={query}
            />
          ))}
        </FilterContainer>
      ) : (
        <Nothing>
          <Wrapper>
            <img src="/remake.png" alt="map" />
          </Wrapper>
          <RemindTitle>看來沒有找到你想要的娃娃或是換換關鍵字!</RemindTitle>
          <div style={{ display: "flex", gap: "1rem" }}>
            <ProdPage as={Link} to="/products">
              商品頁面
            </ProdPage>
            <HomePage as={Link} to="/">
              首頁
            </HomePage>
          </div>
        </Nothing>
      )}
    </SearchContainer>
  );
}
export default SearchRespage;
