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
import { useNavigate } from "react-router-dom";

import ImgContent from "./ImgContent";

import StarRating from "../styles/UI/StarRating";
import { useFetchProdQuery } from "../store/apis/prodApiSlice";
import Skeleton, { SkeletonCardItem } from "../styles/UI/Skeleton";

function ProdCard() {
  const navigate = useNavigate();

  function handleDetailProd(id) {
    navigate(id);
  }

  const { data, isLoading, isError, error } = useFetchProdQuery();

  let contents;

  if (isLoading) {
    contents = Array.from({ length: 6 }, (_, i) => (
      <SkeletonCardItem key={i}>
        <Skeleton />
      </SkeletonCardItem>
    ));
  } else if (isError) {
    contents = <p>錯誤：{error?.data?.message || "發生錯誤"}</p>;
  } else if (data && data.length > 0) {
    contents = data.map((item) => (
      <CardItem key={item._id}>
        <Card>
          <ImageWrapper>
            <TestImg src={item.images[0].url} alt={item.name} />
          </ImageWrapper>

          <CardContent>
            <CardTitle>{item.name}</CardTitle>
            <TextRatingBox>
              <CardText>$ {item.price}</CardText>
              <StarRating rating={item.rate} />
            </TextRatingBox>
            <InfoCartMarkBox>
              <Button onClick={() => handleDetailProd(item._id)}>
                更多資訊
              </Button>
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
