import { useSearchParams } from "react-router-dom";
import { useSearchProdQuery } from "../store/apis/prodApiSlice";

import {
  SearchContainer,
  SpecificTar,
  FilterContainer,
} from "../styles/SearchRespage.style";
function SearchRespage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const { data: products = [], isLoading } = useSearchProdQuery(query, {
    skip: query.trim() === "",
  });

  //console.log(products[0].images[0]);

  if (isLoading) return <p>載入中</p>;

  return (
    <SearchContainer>
      搜尋結果" <SpecificTar>{query}</SpecificTar> "
      <FilterContainer>
        {products.length
          ? products.map((prod) => (
              <div key={prod._id}>
                <img
                  src={prod.images[0].url}
                  alt={prod.images[0].alt}
                  style={{ width: "300px", height: "300px" }}
                />
                <div>{prod.name}</div>
                <p>{prod.price}</p>
              </div>
            ))
          : "看來是沒有東西"}
      </FilterContainer>
    </SearchContainer>
  );
}
export default SearchRespage;
