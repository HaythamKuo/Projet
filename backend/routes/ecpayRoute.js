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
