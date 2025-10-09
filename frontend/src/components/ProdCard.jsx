import styled from "styled-components";

import RefactorCard from "../styles/UI/RefactorCard";

import { useFetchProdQuery } from "../store/apis/prodApiSlice";
import Skeleton, { SkeletonCardItem } from "../styles/UI/Skeleton";

const CardsContainer = styled.section`
  margin: 0 auto;
`;
const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

function ProdCard() {
  const {
    data,
    isLoading: fetching,
    isError,
    error: err,
  } = useFetchProdQuery();

  let contents;

  if (fetching) {
    contents = Array.from({ length: 12 }, (_, i) => (
      <SkeletonCardItem key={i}>
        <Skeleton />
      </SkeletonCardItem>
    ));
  } else if (isError) {
    contents = <p>錯誤：{err?.data?.message || "發生錯誤"}</p>;
  } else if (data && data.length > 0) {
    contents = data.map((item) => (
      <RefactorCard
        key={item._id}
        id={item._id}
        src={item.images[0].url}
        alt={item.name}
        name={item.name}
        price={item.price}
        rating={item.rate}
      />
    ));
  } else {
    contents = <p>目前尚無商品資料</p>;
  }

  return (
    <CardsContainer>
      <Heading>所有娃娃我都放在這了 去找吧!</Heading>

      <Cards>{contents}</Cards>
    </CardsContainer>
  );
}
export default ProdCard;
