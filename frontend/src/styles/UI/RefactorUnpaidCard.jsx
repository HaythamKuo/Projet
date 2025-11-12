import { Fragment } from "react";
import styled from "styled-components";
import { imgBasicStyle } from "../theme";
import { FaRegTrashCan, FaHeart } from "react-icons/fa6";
import { useDeleteGood } from "../../hooks/useDeleteGood";
import { useFavorite } from "../../hooks/useFavorite";
import { useIsaved } from "../../hooks/useisSaved";

//裡面夾一張圖片
const ThumbWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
  border-radius: 2rem;
  padding: 0.5rem;
  aspect-ratio: ${({ $aspect }) => ($aspect ? 16 / 9 : 4 / 3)};

  ${({ theme }) => theme.media.md} {
    aspect-ratio: 16/9;
  }
`;
const ThumbImg = styled.img`
  ${imgBasicStyle}
`;

const ThumbBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 2;

  ${({ theme }) => theme.media.md} {
    flex: 1;
    gap: 1rem;
  }
`;

const ThumbTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ThumbTopSpan = styled.span`
  color: ${({ theme }) => theme.colors.default};

  ${({ theme }) => theme.media.md} {
    font-size: 1.5rem;
  }
`;

const ThumbCenter = styled.div`
  display: flex;
  gap: 1.5rem;

  ${({ theme }) => theme.media.md} {
    flex-direction: row-reverse;
    gap: 3rem;
  }
`;
const ThumbBottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.media.md} {
    justify-content: flex-end;

    gap: 3rem;
  }
`;

const ThumbBottomSpan = styled.span`
  border: 1px solid grey;

  border-radius: 10px;
  padding: 10px;
  color: ${({ theme }) => theme.colors.default};
`;

const IconBtn = styled.button.attrs({ type: "button" })`
  border: none;
  background: none;

  ${({ theme }) => theme.media.md} {
    font-size: 1.25rem;
  }

  &:hover {
    background: none;
  }

  & svg {
    cursor: pointer;
  }
`;

const DeleteCart = styled(FaRegTrashCan)`
  color: ${({ theme }) => theme.colors.default};
`;
const CartToSave = styled(FaHeart)`
  color: ${({ $isSaved, theme }) => ($isSaved ? "red" : theme.colors.default)};
`;

function RafactorUnpaidCard({ src, alt, prodName, unitPrice, item, $aspect }) {
  //進行刪除的動作
  const { handleDelete, isLoading: deleting } = useDeleteGood();

  //負責商品是否有被收藏的狀態
  const { isSaved, isLoading: isChecking } = useIsaved(item.productId._id);

  //用於收藏/取消購物車內的商品
  const { saving, toggleSaved } = useFavorite();

  async function saveProds() {
    await toggleSaved(item.productId._id);
  }

  if (isChecking) return <p>讀取中</p>;

  return (
    <>
      {/* 左半邊 */}
      <ThumbWrapper $aspect={$aspect}>
        <ThumbImg src={src} alt={alt} />
      </ThumbWrapper>

      {/* 右半邊 */}
      <ThumbBox>
        <ThumbTop>
          <ThumbTopSpan>{prodName}</ThumbTopSpan>
          <ThumbTopSpan>{unitPrice}</ThumbTopSpan>
        </ThumbTop>

        <ThumbCenter>
          <IconBtn onClick={() => handleDelete(item)} disabled={deleting}>
            <DeleteCart />
          </IconBtn>

          <IconBtn disabled={saving} onClick={() => saveProds()}>
            <CartToSave $isSaved={isSaved} />
          </IconBtn>
        </ThumbCenter>

        <ThumbBottom>
          {["S", "M", "L"].map((size) => (
            <Fragment key={size}>
              <ThumbBottomSpan>
                {`${size} x ${item?.selectedSizes?.[size]}`}
              </ThumbBottomSpan>
            </Fragment>
          ))}
        </ThumbBottom>
      </ThumbBox>
    </>
  );
}
export default RafactorUnpaidCard;
