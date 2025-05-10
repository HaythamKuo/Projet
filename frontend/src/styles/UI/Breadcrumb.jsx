import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const BreadcrumbContainer = styled.div`
  ul {
    display: flex;
    gap: 1.5rem;
  }
`;

export const BreadLeftArrow = styled(MdOutlineKeyboardArrowLeft)``;
export const BreadRightArrow = styled(BreadLeftArrow)`
  transform: rotate(0.5turn);
`;

//left arrow container
export const Left = styled.div`
  //background-color: yellow;
  display: flex;
  align-items: center;
  gap: 3px;
`;

//right arrow container
export const Right = styled.div`
  //background-color: green;
  display: flex;
  align-items: center;
  gap: 3px;

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

//這個麵包屑可以被重構 不只應用於商品頁面 我覺得可以延伸至其他地方 像是會員, 服務等等

function Breadcrumb() {
  return (
    <BreadcrumbContainer>
      <ul>
        <Left>
          <BreadLeftArrow />
          <span>上一頁</span>
        </Left>

        <Right>
          <li>
            <Link>home</Link>
          </li>
          <BreadRightArrow />
          <li>
            <Link>All prods</Link>
          </li>
          <BreadRightArrow />

          <li>
            <Link>當前商品</Link>
          </li>
        </Right>
      </ul>
    </BreadcrumbContainer>
  );
}
export default Breadcrumb;
