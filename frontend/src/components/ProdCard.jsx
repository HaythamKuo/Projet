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
} from "../styles/ProdCard.style";
//import Image from "./Image";
import ImgContent from "./ImgContent";
import StarRating from "../styles/UI/StarRating";

function ProdCard() {
  const sampleCards = [
    {
      id: 1,
      title: "card grid layout",
      price: "$230",
      imagePath: "/golden-2.jpg",
      rating: 4.3,
    },
    {
      id: 2,
      title: "2card grid layout",
      price: "$235",
      imagePath: "/golden-2.jpg",
      rating: 5,
    },
    {
      id: 3,
      title: "3card grid layout",
      price: "$232",
      imagePath: "/golden-2.jpg",
      rating: 2.6,
    },
    {
      id: 4,
      title: "4card grid layout",
      price: "$233",
      imagePath: "/golden-2.jpg",
      rating: 3.7,
    },
  ];

  const contents = sampleCards.map((item) => (
    <CardItem key={item.id}>
      <Card>
        <ImageWrapper>
          {/* <Image
            src={item.imagePath}
            alt={item.title}
            flex={1}
            borderRadius={0.75}
            topOnly
          /> */}

          {/* 似乎不需要borderRadius? */}
          <ImgContent src={item.imagePath} alt={item.title} flex={1} topOnly />
        </ImageWrapper>

        <CardContent>
          <CardTitle>{item.title}</CardTitle>
          <TextRatingBox>
            <CardText>{item.price}</CardText>
            <StarRating rating={item.rating} />
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

  return (
    <CardsContainer>
      <Heading>所有娃娃我都放在這了 去找吧!</Heading>
      <Cards>{contents}</Cards>
    </CardsContainer>
  );
}
export default ProdCard;
