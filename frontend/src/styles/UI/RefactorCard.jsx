import { Link } from "react-router-dom";
import styled from "styled-components";
import { imgBasicStyle } from "../theme";
import { SubmitBtn, CancelBtn } from "../ProdImgGallery.style";
import { FaRegBookmark, FaCartShopping } from "react-icons/fa6";
import StarRating from "./StarRating";

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 1.5rem;
// `;

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;

  display: flex;

  flex-direction: column;
  background-color: white;
`;

const ImgWrapper = styled.div`
  aspect-ratio: 16/9;
`;

const Img = styled.img`
  ${imgBasicStyle}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: min(10em, 4%);
`;

const ProdName = styled.h3`
  color: red;
  font-size: 2rem;
`;

const InfoCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 1.75rem;
    font-weight: bolder;
  }
`;

const InfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
  //background-color: rebeccapurple;
`;

const GoIoProd = styled(SubmitBtn)`
  flex: 1;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  flex: 2;
`;

const Cart = styled(FaCartShopping)`
  font-size: 1.5rem;
  cursor: pointer;
  //margin-left: 2rem;
`;

const BookMark = styled(FaRegBookmark)`
  font-size: 1.5rem;
  cursor: pointer;
`;
function RefactorCard({ id, src, alt, name, price, rating }) {
  return (
    <Card>
      <ImgWrapper>
        <Img src={src} alt={alt} />
      </ImgWrapper>

      <InfoContainer>
        <ProdName>{name}</ProdName>
        <InfoCenter>
          <p>${price}</p>
          <StarRating rating={rating} />
        </InfoCenter>

        <InfoBottom>
          <GoIoProd as={Link} to={`/products/${id}`}>
            更多資訊
          </GoIoProd>

          <IconBox>
            <Cart />
            <BookMark />
          </IconBox>
        </InfoBottom>
      </InfoContainer>
    </Card>
  );
}

export default RefactorCard;
