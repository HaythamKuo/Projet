import asyncHandler from "express-async-handler";
import crypto from "crypto";
import dayjs from "dayjs";
import OrderModal from "../models/orderModel.js";

const ECPAY_CONFIG = {
  // 測試環境參數 (正式環境請更換為正式參數)
  MerchantID: "3002599",

  HashKey: "spPjZn66i0OhqJsQ",

  HashIV: "hT5OJckN45isQTTs",
  ReturnURL: " https://8ad836a8c395.ngrok-free.app/api/ecpay/ecpay-return", // 付款完成後導向
  //OrderResultURL: "http://localhost:5001/api/ecpay-notify", // 付款結果通知
  OrderResultURL: "https://8ad836a8c395.ngrok-free.app/api/ecpay/ecpay-notify",
  ClientBackURL: `${process.env.CLIENT_ROUTE_DEV}/ectest`, // 前端結果頁面
  PaymentURL: "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5", // 測試環境URL
};

function generateCheckMacValue(params, hashKey, hashIV) {
  const sortKeys = Object.keys(params).sort();

  // 步驟2: 串接參數
  let checkStr = `HashKey=${hashKey}`;

  sortKeys.forEach((key) => {
    if (key !== "CheckMacValue") {
      checkStr += `&${key}=${params[key]}`;
    }
  });
  checkStr += `&HashIV=${hashIV}`;

  // 步驟3: URL encode
  //checkStr = encodeURIComponent(checkStr).toLowerCase().replace(/%20/g, "+");
  checkStr = encodeURIComponent(checkStr).toLowerCase();
  //checkStr = checkStr.toLowerCase();
  checkStr = checkStr
    .replace(/%2d/g, "-")
    .replace(/%5f/g, "_")
    .replace(/%2e/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2a/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%20/g, "+");

  // 步驟4: SHA256 加密
  const hash = crypto.createHash("sha256").update(checkStr).digest("hex");

  return hash.toUpperCase();
}

export const createEcPayment = asyncHandler(async (req, res) => {
  //參數需對照
  const { orderId, totalAmount, itemName, customerEmail } = req.body;

  if (!orderId || !totalAmount || !itemName) {
    res.status(400);
    throw new Error("缺少必要參數");
  }

  //console.log(itemName);

  const params = {
    MerchantID: ECPAY_CONFIG.MerchantID,
    MerchantTradeNo: Date.now().toString(), // 商店交易編號 (唯一值)
    MerchantTradeDate: dayjs().format("YYYY/MM/DD HH:mm:ss"),
    PaymentType: "aio",
    EncryptType: 1,
    TotalAmount: totalAmount.toString(),
    TradeDesc: "商品購買",
    ItemName: itemName,
    ReturnURL: ECPAY_CONFIG.ReturnURL,
    OrderResultURL: ECPAY_CONFIG.OrderResultURL,
    ClientBackURL: ECPAY_CONFIG.ClientBackURL,
    ChoosePayment: "Credit",
    NeedExtraPaidInfo: "N",
    DeviceSource: "P", // 桌面版
    IgnorePayment: "AndroidPay#ApplePay", // 忽略行動支付
    PlatformID: "",
    InvoiceMark: "N", // 不開立電子發票
    CustomField1: orderId.toString(), // 自定義欄位存放原始訂單ID
  };

  if (customerEmail) {
    (params.StoreID = ""), (params.CustomField2 = customerEmail);
  }

  // 產生檢查碼
  params.CheckMacValue = generateCheckMacValue(
    params,
    ECPAY_CONFIG.HashKey,
    ECPAY_CONFIG.HashIV
  );

  console.log("後端 付款單建立成功");
  //console.log(params.CheckMacValue);

  res.json({
    success: true,
    paymentUrl: ECPAY_CONFIG.PaymentURL,
    params,
  });
});
export const getECresNotify = asyncHandler(async (req, res) => {
  // const data = req.body;
  // console.log("收到綠界付款通知:", data);

  // //驗證checkMacValue
  // const dupicateParams = { ...data };
  // delete dupicateParams.CheckMacValue;

  // const calculatedCheckMac = generateCheckMacValue(
  //   dupicateParams,
  //   ECPAY_CONFIG.HashKey,
  //   ECPAY_CONFIG.HashIV
  // );

  // console.log("計算的 CheckMacValue:", calculatedCheckMac);
  // console.log("收到的 CheckMacValue:", data.CheckMacValue);

  // if (calculatedCheckMac !== data.CheckMacValue) {
  //   console.error("檢查碼錯誤，可能被竄改！");
  //   res.status(400);
  //   throw new Error("CheckMacValue Error");
  // }

  // // 處理付款結果
  // if (data.RtnCode === "1") {
  //   const orderId = data.CustomField1;

  //   try {
  //     await OrderModal.findByIdAndUpdate(orderId, {
  //       status: "paid",
  //       // paymentInfo: {
  //       //   tradeNo: data.TradeNo,
  //       //   merchantTradeNo: data.MerchantTradeNo,
  //       //   paymentDate: data.PaymentDate,
  //       //   paymentType: data.PaymentType,
  //       //   tradeAmt: data.TradeAmt,
  //       // },
  //     });
  //     console.log(`訂單 ${orderId} 付款成功`);
  //   } catch (error) {
  //     console.error("更新訂單狀態失敗:", error);
  //   }
  // } else {
  //   console.log("付款失敗:", data.RtnMsg);
  // }

  // // 綠界要求必須回傳 "1|OK"
  // res.send("1|OK");

  // 驗證參數 (可選)
  // 導到前端 React 顯示結果
  console.log("=== 使用者跳轉回來 ===", req.body);

  if (req.body.RtnCode === "1") {
    return res.redirect(
      `${process.env.CLIENT_ROUTE_DEV}/ectest?status=success&orderId=${req.body.CustomField1}`
    );
  } else {
    return res.redirect(
      `${process.env.CLIENT_ROUTE_DEV}/ectest?status=failed&msg=${req.body.RtnMsg}`
    );
  }
});

export const getECresReturn = asyncHandler(async (req, res) => {
  // const data = req.body;
  // console.log("收到綠界回傳資料", data);

  // const dupicateParam = { ...data };
  // delete dupicateParam.CheckMacValue;

  // // 驗證檢查碼（建議保留）
  // const checkMac = generateCheckMacValue(
  //   dupicateParam,
  //   ECPAY_CONFIG.HashKey,
  //   ECPAY_CONFIG.HashIV
  // );

  // // console.log("return回來的： ", checkMac);
  // // console.log("原始data： ", data.CheckMacValue);

  // if (checkMac !== data.CheckMacValue) {
  //   console.error("檢查碼錯誤，可能被竄改！");
  //   // 重定向到錯誤頁面
  //   return res.redirect(`${process.env.CLIENT_ROUTE_DEV}`);
  // }

  // // 根據付款結果重定向到不同頁面
  // if (data.RtnCode === "1") {
  //   // 付款成功，重定向到成功頁面，並帶上必要參數

  //   //console.log("進到這一段");

  //   const queryParams = new URLSearchParams({
  //     status: "success",
  //     orderId: data.CustomField1,
  //     tradeNo: data.MerchantTradeNo,
  //     amount: data.TradeAmt,
  //   }).toString();

  //   // queryParams: status=success&orderId=68b90c9b6d3e43fc6869e240&tradeNo=1756957851187&amount=171

  //   //console.log(queryParams);

  //   res.redirect(`${process.env.CLIENT_ROUTE_DEV}/ectest?${queryParams}`);

  //   // return res.json({
  //   //   success: true,
  //   //   redirectURL: `${process.env.CLIENT_ROUTE_DEV}/ectest?${queryParams}`,
  //   // });
  // } else {
  //   // 付款失敗，重定向到失敗頁面
  //   const queryParams = new URLSearchParams({
  //     status: "failed",
  //     message: data.RtnMsg,
  //   }).toString();

  //   res.redirect(`${process.env.CLIENT_ROUTE_DEV}/ectest?${queryParams}`);
  // }
  // //res.send("1|OK");

  console.log("=== 綠界 ReturnURL ===");
  console.log(req.body); // 付款結果參數

  // TODO: 驗證 CheckMacValue
  // TODO: 更新 DB 訂單狀態

  return res.send("1|OK"); // 一定要回這個
});
