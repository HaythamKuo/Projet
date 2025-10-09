import styled from "styled-components";
import { motion } from "framer-motion";
import { useGetSaveProdsQuery } from "../store/apis/apiSlice";
import saveSvg from "../assets/save_prods.svg?react";
import Skeleton, { SkeletonCardItem } from "../styles/UI/Skeleton";

import { flexCenter, imgBasicStyle } from "../styles/theme";
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
`;
const StatusBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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

function Collections({ userId }) {
  const { data: prods, isLoading } = useGetSaveProdsQuery(userId);
  // console.log(prods);

  //const colletions = prods?.favorites;
  //console.log(colletions);

  const hasCollections = !prods || prods?.length === 0;

  let content;
  if (isLoading) {
    content = Array.from({ length: 4 }, (_, index) => (
      <SkeletonCardItem key={index}>
        <Skeleton />
      </SkeletonCardItem>
    ));
  } else if (!prods || prods?.length === 0) {
    // content = (
    //   <SaveSvgBox>
    //     <SaveSvg />
    //     <p style={{ fontSize: "2rem", color: "#777", fontWeight: "bold" }}>
    //       目前沒有收藏的商品
    //     </p>
    //   </SaveSvgBox>
    // );

    content = Array.from({ length: 4 }, (_, index) => (
      <SkeletonCardItem key={index}>
        <Skeleton />
      </SkeletonCardItem>
    ));
  } else {
    content = prods.map((item) => (
      <StatusBox initial="rest" whileHover="hover" key={item._id}>
        <Wrapper>
          <Img src={item.images[0].url} alt="img" />
        </Wrapper>
        <TitleName variants={titleNameVariants}>{item.name}</TitleName>
      </StatusBox>
    ));
  }

  return (
    <ProdListContainer $hasProds={!hasCollections}>
      {/* <StatusBox>
        <Wrapper>
          <Img src="/husky-2.jpg" />
        </Wrapper>
        <TitleName>willson</TitleName>
      </StatusBox>
      <Wrapper>
        <Img src="/husky-2.jpg" />
      </Wrapper>
      <Wrapper>
        <Img src="/husky-2.jpg" />
      </Wrapper>
      <Wrapper>
        <Img src="/husky-2.jpg" />
      </Wrapper>
      <Wrapper>
        <Img src="/husky-2.jpg" />
      </Wrapper>
      <Wrapper>
        <Img src="/husky-2.jpg" />
      </Wrapper>
      <Wrapper>
        <Img src="/husky-2.jpg" />
      </Wrapper> */}

      {content}
    </ProdListContainer>
  );
}
export default Collections;
