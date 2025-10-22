import styled from "styled-components";

import RefactorCard from "../styles/UI/RefactorCard";
import IntroTitle from "./reactBit/IntroTitle";

import { useFetchProdQuery } from "../store/apis/prodApiSlice";
import Skeleton, { SkeletonCardItem } from "../styles/UI/Skeleton";
import Breadcrumb from "../styles/UI/Breadcrumb";

const CardsContainer = styled.section`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;
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
      {/* <Heading>所有娃娃我都放在這了 去找吧!</Heading> */}
      <IntroTitle
        direction="bottom"
        text="所有娃娃我都放在這了 去找吧!"
        size="3rem"
        $center
      />
      <Breadcrumb />
      <Cards>{contents}</Cards>
    </CardsContainer>
  );
}
export default ProdCard;
