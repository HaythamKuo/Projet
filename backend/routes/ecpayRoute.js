import express, { Router } from "express";

import {
  createEcPayment,
  getECresNotify,
  getECresReturn,
} from "../controllers/ecPaymentController.js";

const ecPayRouter = Router();

ecPayRouter.route("/create-payment").post(createEcPayment);

// 綠界伺服器通知 (後端處理 & 回 "1|OK")
ecPayRouter
  .route("/ecpay-return")
  .post(express.urlencoded({ extended: false }), getECresReturn);

// 使用者瀏覽器跳轉的結果頁
ecPayRouter
  .route("/ecpay-notify")
  .all(express.urlencoded({ extended: false }), getECresNotify);

export default ecPayRouter;

// import express, { Router } from "express";
// import {
//   createEcPayment,
//   getECresNotify, // 伺服器通知 (ReturnURL)
//   getECresReturn, // 前端回跳 (ClientBackURL/OrderResultURL)
// } from "../controllers/ecPaymentController.js";

// const ecPayRouter = Router();

// // 建立付款單
// ecPayRouter.post("/create-payment", createEcPayment);

// // ✅ 綠界伺服器通知 (ReturnURL) → 後端處理 & 回 "1|OK"
// ecPayRouter.post(
//   "/ecpay-return",
//   express.urlencoded({ extended: false }),
//   getECresNotify
// );

// // ✅ 使用者瀏覽器跳轉的結果頁 (OrderResultURL / ClientBackURL)
// ecPayRouter.all(
//   "/ecpay-client-return",
//   express.urlencoded({ extended: false }),
//   getECresReturn
// );

// export default ecPayRouter;
