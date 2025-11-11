import { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  useGetSaveProdsQuery,
  useRemoveProdsMutation,
} from "../store/apis/apiSlice";
import saveSvg from "../assets/save_prods.svg?react";
import Skeleton, { SkeletonCardItem } from "../styles/UI/Skeleton";
import { Delete } from "../styles/UploadProdList.style";
import Modal from "./Modal";

import { flexCenter, imgBasicStyle } from "../styles/theme";
import ProcessLoader from "../styles/UI/ProcessLoader";
import { SubmitBtn, CancelBtn } from "../styles/ProdImgGallery.style";
import ShinyText from "./reactBit/ShinyText";

const titleNameVariants = {
  rest: {
    y: 0,
    transition: { type: "tween" }, // 確保有初始過渡
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.4,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
};

///// 分界線 //////
const ProdListContainer = styled.div`
  ${({ $hasProds }) =>
    $hasProds
      ? `
        /* A. 有產品時：使用 Grid 佈局 */
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;

        /* 響應式 */
        @media (max-width: 1024px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 600px) {
          grid-template-columns: 1fr;
        }
      `
      : `
        /* B. 沒有產品時：使用 Flex 佈局來居中顯示「目前沒有收藏的商品」等文字 */
        ${flexCenter}
        
        min-height: 200px; /* 給予一定高度，讓文字居中效果明顯 */
       
      `}
`;

const Wrapper = styled.div`
  width: 100%;
  height: min(200px, 80vh);
  border-radius: 8px;
  overflow: auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;
const Img = styled.img`
  ${imgBasicStyle}
`;
const TitleName = styled(motion.h2)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.default};
  ${({ theme }) => theme.media.md} {
    font-size: 1.5rem;
  }
`;
const StatusBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  position: relative;
`;

const SaveSvgBox = styled.div`
  ${flexCenter}
  flex-direction: column;
  gap: 1.5rem;
`;

const SaveSvg = styled(saveSvg)`
  width: 300px;
  height: 300px;
  align-self: center;
`;

const DeleteCollection = styled(Delete)`
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 20;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  color: black;
`;
export const ConfirmTxt = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.default};
`;
export const BtnContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

function Collections({ userId }) {
  const { data: prods, isLoading } = useGetSaveProdsQuery();

  //一個陣列包涵id 名字 圖片
  // console.log(prods);

  //進行移除動作
  const [target, setTarget] = useState(null);
  const [rmSaveProds, { isLoading: deleting }] = useRemoveProdsMutation();

  function handleModalAndRmTar(id) {
    setOpen(true);
    setTarget(id);
  }

  async function removeAction(prodId, userId) {
    setOpen(false);
    await rmSaveProds({ prodId, userId });
  }

  //控制Modal開關
  const dialogRef = useRef(null);

  const [isOpen, setOpen] = useState(false);

  const hasCollections = !prods || prods?.length === 0;

  let content;
  if (isLoading) {
    content = Array.from({ length: 4 }, (_, index) => (
      <SkeletonCardItem key={index}>
        <Skeleton />
      </SkeletonCardItem>
    ));
  } else if (!prods || prods?.length === 0) {
    content = (
      <SaveSvgBox>
        <SaveSvg />
        <ShinyText text="目前沒有收藏的商品" />
      </SaveSvgBox>
    );
  } else {
    content = prods.map((item) => (
      <StatusBox initial="rest" whileHover="hover" key={item._id}>
        <DeleteCollection onClick={() => handleModalAndRmTar(item._id)} />
        <Link to={`/products/${item._id}`}>
          <Wrapper>
            <Img src={item.images[0].url} alt="img" />
          </Wrapper>
        </Link>
        <TitleName variants={titleNameVariants}>{item.name}</TitleName>
      </StatusBox>
    ));
  }

  if (deleting) return <ProcessLoader />;

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          ref={dialogRef}
          // minorHeight="500px"
          width="500px"
          height="500px"
        >
          <ConfirmTxt>確定取消收藏嗎？</ConfirmTxt>
          <BtnContainer>
            <SubmitBtn onClick={() => removeAction(target, userId)}>
              確定
            </SubmitBtn>
            <CancelBtn onClick={() => setOpen(false)}>取消</CancelBtn>
          </BtnContainer>
        </Modal>
      )}
      <ProdListContainer $hasProds={!hasCollections}>
        {content}
      </ProdListContainer>
    </>
  );
}
export default Collections;
