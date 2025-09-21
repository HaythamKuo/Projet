import { Fragment } from "react";
import styled from "styled-components";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

//api
import { useFetchSpecificProdQuery } from "../../store/apis/prodApiSlice";
import ProcessLoader from "./ProcessLoader";

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

export const Left = styled.div`
  //background-color: yellow;
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  a:last-child {
    color: black;
    font-weight: bolder;
    pointer-events: none;
  }

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

//const DirectGroup=styled.div``

const Direct = styled.span`
  color: #594f21;
`;

//這個麵包屑可以被重構 不只應用於商品頁面 我覺得可以延伸至其他地方 像是會員, 服務等等

function Breadcrumb() {
  const breadcrumbMap = {
    products: "全部商品",
    search: "搜尋結果",
  };

  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const [queryString] = useSearchParams();
  const query = queryString.get("query");

  // 判斷是否有從搜尋頁過來
  const fromQuery = state?.fromQuery || query;

  //商品id
  const { prodid } = useParams();

  const {
    data: prod,
    isLoading,
    isError,
  } = useFetchSpecificProdQuery(prodid, { skip: !prodid });

  const segments = pathname.split("/").filter(Boolean);

  const testCrumbs = [{ path: "/", label: "首頁" }];

  // if (segments.includes("products") && !fromQuery) {
  //   testCrumbs.push({ path: "/products", label: breadcrumbMap["products"] });
  // }

  if (segments.includes("search") && fromQuery) {
    testCrumbs.push({
      path: `/search?query=${encodeURIComponent(fromQuery)}`,
      label: `搜尋結果:${fromQuery}`,
    });
  }

  // 如果有搜尋關鍵字，不論當前路由是 search 還是 products 都要加
  if (fromQuery && prodid) {
    testCrumbs.push({
      path: `/search?query=${encodeURIComponent(fromQuery)}`,
      label: fromQuery,
    });
  } else if (segments.includes("products")) {
    // 沒有搜尋時才顯示「全部商品」
    testCrumbs.push({ path: "/products", label: breadcrumbMap["products"] });
  }

  if (prodid) {
    testCrumbs.push({
      path: `/products/${prodid}`,
      label: prod?.name || (isLoading ? "載入中" : "未知商品"),
    });
  }

  if (isLoading) return <p>載入中</p>;
  if (isError) {
    console.log("發生一些錯誤");
  }

  return (
    <BreadcrumbContainer>
      <ul>
        <Left onClick={() => navigate(-1)}>
          <BreadLeftArrow />
          <Direct style={{ cursor: "pointer" }}>上一頁</Direct>
        </Left>
        <div
          style={{ background: "gray", padding: "1px", margin: "5px" }}
        ></div>
        <Right>
          {testCrumbs.map(({ path, label }, index) => (
            <Fragment key={path}>
              {index > 0 && <BreadRightArrow />}
              <Direct as={Link} to={path}>
                {label}
              </Direct>
            </Fragment>
          ))}
        </Right>
      </ul>
    </BreadcrumbContainer>
  );
}
export default Breadcrumb;
