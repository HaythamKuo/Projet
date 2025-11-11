import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import { useFavorite } from "../../hooks/useFavorite";
import { useIsaved } from "../../hooks/useisSaved";
import { addGoods } from "../../store/thunks/addGoods";
import { imgBasicStyle } from "../theme";
import { SubmitBtn } from "../ProdImgGallery.style";
import { FaBookmark, FaCartShopping } from "react-icons/fa6";
import StarRating from "./StarRating";
import ProcessLoader from "./ProcessLoader";

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;

  display: flex;

  flex-direction: column;
  background-color: ${({ theme }) => theme.card.specificBack};
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
  color: ${({ theme }) => theme.colors.default};
  font-size: 2rem;
  font-weight: bold;
`;

const InfoCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 1.75rem;
    font-weight: bolder;
    color: ${({ theme }) => theme.colors.default};
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
  color: ${({ theme }) => theme.colors.default};
`;

const BookMark = styled(FaBookmark)`
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme, $isSaved }) => ($isSaved ? "red" : theme.colors.default)};
`;
function RefactorCard({ id, src, alt, name, price, rating, query }) {
  //宣告專區
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { userInfo } = useSelector((state) => state.auth);

  const { saving, toggleSaved } = useFavorite();
  const { isLoading, isSaved } = useIsaved(id);

  async function addToCart() {
    if (!userInfo) {
      toast.error("請先登入再進行購物喔！");
      return;
    }

    try {
      await dispatch(
        addGoods({
          productId: id,
          selectedSizes: { S: 0, M: quantity, L: 0 },
          unitPrice: price,
        })
      ).unwrap();
      setQuantity((pre) => pre + 1);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "加入購物車失敗");
    }
  }

  async function saveProds() {
    if (!userInfo) {
      toast.error("請先登入再進行收藏喔！");

      return;
    }
    await toggleSaved(id);
  }

  if (saving) return <ProcessLoader />;

  return (
    <Card>
      <ImgWrapper>
        <Img src={src} alt={alt} />
      </ImgWrapper>

      <InfoContainer>
        <ProdName>{name}</ProdName>
        <InfoCenter>
          <p>$ {price}</p>
          <StarRating rating={rating} />
        </InfoCenter>

        <InfoBottom>
          <GoIoProd
            as={Link}
            to={`/products/${id}`}
            state={{ fromQuery: query }}
          >
            更多資訊
          </GoIoProd>

          <IconBox>
            <Cart onClick={() => addToCart()} />
            <BookMark $isSaved={isSaved} onClick={() => saveProds()} />
          </IconBox>
        </InfoBottom>
      </InfoContainer>
    </Card>
  );
}

export default RefactorCard;
