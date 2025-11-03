// // useBreadcrumbs.js
// import { useLocation, useParams, useSearchParams } from "react-router-dom";
// import { useFetchSpecificProdQuery } from "../../store/apis/prodApiSlice";

// export const useBreadcrumbs = (routeMap = {}) => {
//   const { pathname } = useLocation();
//   const segments = pathname.split("/").filter(Boolean);

//   const { prodid } = useParams();
//   const [queryString] = useSearchParams();
//   const query = queryString.get("query");

//   // 若有商品 id，嘗試抓商品資料
//   const { data: prod, isLoading } = useFetchSpecificProdQuery(prodid || "", {
//     skip: !prodid,
//   });

//   const crumbs = [];
//   let currentPath = "";

//   segments.forEach((segment, index) => {
//     currentPath += `/${segment}`;

//     // 嘗試從 routeMap 找出對應名稱
//     let label = routeMap[currentPath];

//     // 若為動態路由
//     if (!label && routeMap[`${currentPath.replace(`/${segment}`, "")}/:prodid`]) {
//       if (prodid) {
//         label = prod?.name || (isLoading ? "載入中..." : "商品詳情");
//       } else {
//         label = "未知項目";
//       }
//     }

//     // 特別處理搜尋頁
//     if (segment === "search" && query) {
//       label = `${routeMap["/search"] || "搜尋結果"}：${query}`;
//     }

//     if (label) crumbs.push({ path: currentPath, label });
//   });

//   // 確保首頁永遠在最前面
//   if (!crumbs.some(c => c.path === "/")) {
//     crumbs.unshift({ path: "/", label: routeMap["/"] || "首頁" });
//   }

//   return { crumbs, isLoading };
// };
