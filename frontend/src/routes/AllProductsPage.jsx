import { InputContainer, ProdPageContainer } from "../styles/prodPage.style";
import Input from "../styles/UI/Input";
import ParallaxSection from "../styles/UI/ParallaxSection";
import ProdCard from "../components/ProdCard";
import StarRating from "../styles/UI/StarRating";

function AllProductsPage() {
  return (
    <ProdPageContainer>
      {/* 搜尋框 需置中 */}
      <InputContainer>
        <Input width="300px" focusWidth="360px" hoverWidth="420px" />
      </InputContainer>

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
