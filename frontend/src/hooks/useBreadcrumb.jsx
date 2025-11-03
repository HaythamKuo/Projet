import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useFetchSpecificProdQuery } from "../store/apis/prodApiSlice";

/**
 * 一個自訂 Hook，用於根據當前路由生成麵包屑列表。
 *
 * 它利用 Redux Toolkit Query 鉤子動態解析產品詳情頁面的標籤，
 * 並在搜尋結果頁面中包含搜尋查詢詞。
 *
 * @param {Object<string, string>} [routeMap={}] - 靜態路由路徑（例如：'/products'）到其顯示標籤的映射。
 * 帶有動態參數的路徑（例如產品詳情）應在映射中使用佔位符
 * （例如：`'/products/:prodid'`）。
 * @returns {{crumb: Breadcrumb[], isLoading: boolean}} 返回一個包含以下內容的物件：
 * - **crumb**: 當前路徑的 {@link Breadcrumb} 物件陣列。
 * - **isLoading**: 一個布林值，指示是否正在擷取產品詳情頁面的產品數據。
 *
 * @example
 * const routeMapping = {
 * "/": "首頁",
 * "/products": "所有商品",
 * "/products/:prodid": "商品詳情", // 動態部分的標籤將會被擷取
 * "/search": "搜尋結果",
 * };
 *
 * const { crumb, isLoading } = useBreadcrumbs(routeMapping);
 *
 * // 範例：在路徑 /products/abc123?query=shoe 上，其中 'abc123' 是一個名為 '復古跑鞋' 的產品
 * // crumb 將會是：
 * // [
 * //   { path: "/", label: "首頁" },
 * //   { path: "/products", label: "所有商品" },
 * //   { path: "/products/abc123", label: "復古跑鞋" }
 * // ]
 *
 * // 範例：在路徑 /search?query=shoe 上
 * // crumb 將會是：
 * // [
 * //   { path: "/", label: "首頁" },
 * //   { path: "/search", label: "搜尋結果:shoe" }
 * // ]
 */

export const useBreadcrumbs = (routeMap = {}) => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  const { prodid } = useParams();
  const [queryString] = useSearchParams();

  const query = queryString.get("query");

  const { data: prod, isLoading } = useFetchSpecificProdQuery(prodid || "", {
    skip: !prodid,
  });

  const crumb = [];
  let currentPath = "";

  segments.forEach((segment) => {
    // /products/abc123
    currentPath += `/${segment}`;
    let label = routeMap[currentPath];

    if (
      !label &&
      routeMap[`${currentPath.replace(`/${segment}`, "")}/:prodid`]
    ) {
      if (prodid) {
        label = prod?.name || (isLoading ? "載入中..." : "商品詳情");
      } else {
        label = "未知項目";
      }
    }

    if (segment === "search" && query) {
      label = `${routeMap["/search"] || "搜尋結果"}:${query}`;
    }

    if (label) crumb.push({ path: currentPath, label });
  });

  if (!crumb.some((c) => c.path === "/"))
    crumb.unshift({ path: "/", label: routeMap["/"] || "首頁" });

  return { crumb, isLoading };
};
