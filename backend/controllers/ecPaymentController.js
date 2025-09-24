import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import dayjs from "dayjs";
import OrderModal from "../models/orderModel.js";

const ECPAY_CONFIG = {
  // 測試環境參數 (正式環境請更換為正式參數)
  MerchantID: "3002599",
  HashKey: "spPjZn66i0OhqJsQ",
  HashIV: "hT5OJckN45isQTTs",

  ReturnURL: `${process.env.ECPAYRETURN_URL}/api/ecpay/ecpay-return`, // 付款完成後導向
  OrderResultURL: `${process.env.ECPAYRETURN_URL}/api/ecpay/ecpay-notify`,
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

//導向前端
export const getECresNotify = asyncHandler(async (req, res) => {
  console.log("=== 使用者跳轉回來 ===", req.body);

  if (req.body.RtnCode === "1") {
    return res.redirect(
      `${process.env.CLIENT_ROUTE_DEV}/ecpayresult?status=success&orderId=${req.body.CustomField1}`
    );
  } else {
    return res.redirect(
      `${process.env.CLIENT_ROUTE_DEV}/ecpayresult?status=failed&msg=${req.body.RtnMsg}`
    );
  }
});

//處理資料更新及回應1|0K 尚未捕捉錯誤
export const getECresReturn = asyncHandler(async (req, res) => {
  console.log("=== 綠界 ReturnURL ===");
  console.log(req.body); // 付款結果參數

  // TODO: 驗證 CheckMacValue
  // TODO: 更新 DB 訂單狀態
  const data = req.body;

  const { CheckMacValue, ...para } = data;

  const checkMac = generateCheckMacValue(
    para,
    ECPAY_CONFIG.HashKey,
    ECPAY_CONFIG.HashIV
  );

  if (checkMac !== CheckMacValue) {
    console.error("檢查碼錯誤，可能被竄改！");
    res.status(400);
    throw new Error("CheckMacValue Error");
  }

  const order = await OrderModal.findById(data.CustomField1);

  if (!order) {
    console.error("找不到對應訂單:", order);
    return res.send("1|OK");
  }

  try {
    if (data.RtnCode === "1") {
      order.status = "paid";
      order.paidAt = data.TradeDate;

      order.paymentInfo = {
        tradeNo: data.TradeNo,
        merchantTradeNo: data.MerchantTradeNo,
        paymentType: data.PaymentType,
        rtnMsg: data.RtnMsg,
      };
      await order.save();

      console.log(`✅ 訂單 ${order._id} 已更新為已付款`);
    } else {
      order.status = "failed";
      order.paymentMethod = {
        rtnMsg: data.RtnMsg,
      };
      await order.save();

      console.log(`❌ 訂單 ${order._id} 付款失敗: ${data.RtnMsg}`);
    }

    return res.send("1|OK"); // 一定要回這個
  } catch (error) {
    console.error("更新訂單狀態失敗:", error);
    res.send("1|OK");
  }
});
