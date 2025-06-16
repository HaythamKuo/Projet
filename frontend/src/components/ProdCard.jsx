import {
  CardsContainer,
  Heading,
  Cards,
  CardItem,
  Card,
  ImageWrapper,
  CardContent,
  CardTitle,
  CardText,
  Button,
  TextRatingBox,
  Cart,
  InfoCartMarkBox,
  BookMark,
  CartMarkBox,
  TestImg,
} from "../styles/ProdCard.style";

import ImgContent from "./ImgContent";

import StarRating from "../styles/UI/StarRating";
import { useFetchProdQuery } from "../store/apis/prodApiSlice";
import Skeleton, { SkeletonCardItem } from "../styles/UI/Skeleton";

function ProdCard() {
  const { data, isLoading, isError, error } = useFetchProdQuery();

  let contents;

  Array.from({ length: 6 }, (_, i) => (
    <SkeletonCardItem key={i}>
      <Skeleton />
    </SkeletonCardItem>
  ));

  if (isLoading) {
    contents = Array.from({ length: 6 }, (_, i) => (
      <SkeletonCardItem key={i}>
        <Skeleton />
      </SkeletonCardItem>
    ));
  } else if (isError) {
    contents = <p>{error.toString()}</p>;
  } else if (data && data.length > 0) {
    contents = data.map((item) => (
      <CardItem key={item._id}>
        <Card>
          <ImageWrapper>
            <TestImg src={item.images[0]} alt={item.name} />
          </ImageWrapper>

          <CardContent>
            <CardTitle>{item.name}</CardTitle>
            <TextRatingBox>
              <CardText>{item.price}</CardText>
              <StarRating rating={item.rate} />
            </TextRatingBox>
            <InfoCartMarkBox>
              <Button>更多資訊</Button>
              <CartMarkBox>
                <BookMark />
                <Cart />
              </CartMarkBox>
            </InfoCartMarkBox>
          </CardContent>
        </Card>
      </CardItem>
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
