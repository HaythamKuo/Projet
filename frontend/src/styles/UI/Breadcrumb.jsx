import { Fragment } from "react";

import {
  BreadcrumbContainer,
  BreadLeftArrow,
  BreadRightArrow,
  Left,
  Right,
  Direct,
  Division,
} from "../breadCrumb.style";
import { Link, useNavigate } from "react-router-dom";

import { useBreadcrumbs } from "../../hooks/useBreadcrumb";

const routeMap = {
  "/": "首頁",
  "/products": "全部商品",
  "/products/:prodid": "商品詳情",
  "/search": "搜尋結果",
  "/profile": "個人帳戶",
  "/profile/create-product": "創建商品",
  "/profile/edit-product/:prodid": "編輯商品",
  "/service": "服務中心",
};

function Breadcrumb() {
  const navigate = useNavigate();
  const { crumb, isLoading } = useBreadcrumbs(routeMap);

  if (isLoading) return <p>載入中...</p>;

  return (
    <BreadcrumbContainer>
      <ul>
        <Left onClick={() => navigate(-1)}>
          <BreadLeftArrow />
          <Direct>上一頁</Direct>
        </Left>

        <Division />

        <Right>
          {crumb.map(({ path, label }, index) => (
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
