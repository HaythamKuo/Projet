import { Link, useSearchParams } from "react-router-dom";
import { useSearchProdQuery } from "../store/apis/prodApiSlice";

import {
  SearchContainer,
  SpecificTar,
  FilterContainer,
  ImgWrapper,
  Img,
  Card,
  InfoContainer,
  InfoCenter,
  ProdName,
  InfoBottom,
  GoIoProd,
  IconBox,
  Cart,
  BookMark,
} from "../styles/SearchRespage.style";
import ProcessLoader from "../styles/UI/ProcessLoader";
import StaRating from "../styles/UI/StarRating";
function SearchRespage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const { data: products = [], isLoading } = useSearchProdQuery(query, {
    skip: query.trim() === "",
  });

  if (isLoading) return <ProcessLoader />;

  return (
    <SearchContainer>
      搜尋結果" <SpecificTar>{query}</SpecificTar> "
      <FilterContainer>
        {products.length
          ? products.map((prod) => (
              <Card key={prod._id}>
                <ImgWrapper>
                  <Img src={prod.images[0].url} alt={prod.images[0].alt} />
                </ImgWrapper>
                <InfoContainer>
                  <ProdName>{prod.name}</ProdName>
                  <InfoCenter>
                    <p>${prod.price}</p>
                    <StaRating rating={3} />
                  </InfoCenter>
                  <InfoBottom>
                    <GoIoProd as={Link} to={""}>
                      更多資訊
                    </GoIoProd>
                    <IconBox>
                      <Cart />
                      <BookMark />
                    </IconBox>
                  </InfoBottom>
                </InfoContainer>
              </Card>
            ))
          : "看來是沒有東西"}
      </FilterContainer>
    </SearchContainer>
  );
}
export default SearchRespage;
