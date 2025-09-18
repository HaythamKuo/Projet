import styled from "styled-components";

import ParallaxSection from "../styles/UI/ParallaxSection";
import ProdCard from "../components/ProdCard";

import StarRating from "../styles/UI/StarRating";

const ProdPageContainer = styled.div``;
function AllProductsPage() {
  return (
    <ProdPageContainer>
      {/* 動畫 */}
      <div>
        <ParallaxSection />
      </div>
      {/* 條件 */}
      <div></div>
      {/* 圖片 */}
      <div>
        <ProdCard />
      </div>
    </ProdPageContainer>
  );
}
export default AllProductsPage;
