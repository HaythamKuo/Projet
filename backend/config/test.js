// // routes/orderRoutes.js
// const express = require('express');
// const crypto = require('crypto');
// const moment = require('moment');
// const router = express.Router();

// // 假設您已經有這些模型
// // const Order = require('../models/Order');
// // const User = require('../models/User');

// // 綠界測試環境設定
// const ECPAY_CONFIG = {
//   MerchantID: '2000132',
//   HashKey: '5294y06JbISpM5x9',
//   HashIV: 'v77hoKGq4kWxNNIS',
//   ReturnURL: 'http://localhost:3001/api/orders/ecpay/return',
//   OrderResultURL: 'http://localhost:3001/api/orders/ecpay/notify',
//   ClientBackURL: 'http://localhost:3000/payment/result',
//   PaymentURL: 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',
// };

// // 產生檢查碼函數
// function generateCheckMacValue(params, hashKey, hashIV) {
//   const sortedKeys = Object.keys(params).sort();

//   let checkStr = `HashKey=${hashKey}`;
//   sortedKeys.forEach(key => {
//     if (key !== 'CheckMacValue') {
//       checkStr += `&${key}=${params[key]}`;
//     }
//   });
//   checkStr += `&HashIV=${hashIV}`;

//   checkStr = encodeURIComponent(checkStr).toLowerCase();
//   const hash = crypto.createHash('sha256').update(checkStr).digest('hex');

//   return hash.toUpperCase();
// }

// // 建立訂單 API
// router.post('/create', async (req, res) => {
//   try {
//     const { address, totalAmount, items, totalPrice, paymentMethod } = req.body;

//     // 驗證必要欄位
//     if (!address || !items || !totalPrice) {
//       return res.status(400).json({
//         success: false,
//         message: '缺少必要的訂單資訊'
//       });
//     }

//     // 驗證商品項目
//     if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: '購物車是空的'
//       });
//     }

//     // 創建訂單資料
//     const orderData = {
//       // _id 會自動產生
//       address: address.trim(),
//       totalAmount,
//       orderItems: items.map(item => ({
//         product: item.product,
//         prodName: item.prodName,
//         quantity: item.quantity,
//         price: item.price,
//         name: item.prodName // 為了綠界 itemName 使用
//       })),
//       totalPrice,
//       paymentMethod,
//       paymentStatus: 'pending',
//       orderStatus: 'processing',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     };

//     // 模擬儲存到資料庫 (請根據您的 MongoDB 模型調整)
//     /*
//     const newOrder = new Order(orderData);
//     await newOrder.save();
//     */

//     // 模擬回傳 (請替換為實際的資料庫操作)
//     const mockOrder = {
//       ...orderData,
//       _id: `order_${Date.now()}`, // 模擬 MongoDB ObjectId
//     };

//     res.status(201).json({
//       success: true,
//       message: '訂單建立成功',
//       newOrder: mockOrder
//     });

//   } catch (error) {
//     console.error('建立訂單錯誤:', error);
//     res.status(500).json({
//       success: false,
//       message: '建立訂單失敗',
//       error: error.message
//     });
//   }
// });

// // 建立綠界付款單 API
// router.post('/create-ecpay', async (req, res) => {
//   try {
//     const { orderId, totalAmount, itemName, customerEmail } = req.body;

//     // 驗證必要參數
//     if (!orderId || !totalAmount || !itemName) {
//       return res.status(400).json({
//         success: false,
//         message: '缺少必要的付款參數',
//         step: 'validation'
//       });
//     }

//     // 驗證金額 (必須是正整數)
//     const amount = parseInt(totalAmount);
//     if (isNaN(amount) || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: '無效的付款金額',
//         step: 'validation'
//       });
//     }

//     // 驗證訂單是否存在 (這裡需要根據您的資料庫實作)
//     /*
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: '找不到對應的訂單',
//         step: 'validation'
//       });
//     }
//     */

//     // 建立綠界參數
//     const tradeDate = moment().format('YYYY/MM/DD HH:mm:ss');
//     const merchantTradeNo = `${orderId}_${Date.now()}`; // 確保唯一性

//     const ecpayParams = {
//       MerchantID: ECPAY_CONFIG.MerchantID,
//       MerchantTradeNo: merchantTradeNo,
//       MerchantTradeDate: tradeDate,
//       PaymentType: 'aio',
//       TotalAmount: amount,
//       TradeDesc: '線上購物',
//       ItemName: itemName.substring(0, 200), // 綠界限制商品名稱長度
//       ReturnURL: ECPAY_CONFIG.ReturnURL,
//       OrderResultURL: ECPAY_CONFIG.OrderResultURL,
//       ClientBackURL: ECPAY_CONFIG.ClientBackURL,
//       ChoosePayment: 'ALL',
//       NeedExtraPaidInfo: 'N',
//       DeviceSource: 'P',
//       IgnorePayment: 'AndroidPay#ApplePay',
//       PlatformID: '',
//       InvoiceMark: 'N',
//       CustomField1: orderId, // 存放原始訂單ID
//     };

//     // 如果有客戶 email，加入參數
//     if (customerEmail) {
//       ecpayParams.StoreID = '';
//       ecpayParams.CustomField2 = customerEmail;
//     }

//     // 產生檢查碼
//     ecpayParams.CheckMacValue = generateCheckMacValue(
//       ecpayParams,
//       ECPAY_CONFIG.HashKey,
//       ECPAY_CONFIG.HashIV
//     );

//     // 更新訂單的綠界交易編號 (根據您的資料庫實作)
//     /*
//     await Order.findByIdAndUpdate(orderId, {
//       ecpayTradeNo: merchantTradeNo,
//       paymentStatus: 'pending',
//       updatedAt: new Date()
//     });
//     */

//     console.log('綠界付款單建立成功:', {
//       orderId,
//       merchantTradeNo,
//       amount
//     });

//     res.json({
//       success: true,
//       message: '付款單建立成功',
//       paymentUrl: ECPAY_CONFIG.PaymentURL,
//       formData: ecpayParams,
//       orderId: orderId,
//       merchantTradeNo: merchantTradeNo
//     });

//   } catch (error) {
//     console.error('建立綠界付款單錯誤:', error);
//     res.status(500).json({
//       success: false,
//       message: '建立付款單失敗',
//       step: 'payment',
//       error: error.message
//     });
//   }
// });

// // 綠界付款結果通知 (POST by 綠界)
// router.post('/ecpay/notify', express.urlencoded({ extended: true }), async (req, res) => {
//   try {
//     const data = req.body;
//     console.log('收到綠界付款通知:', data);

//     // 驗證檢查碼
//     const receivedCheckMac = data.CheckMacValue;
//     const verifyData = { ...data };
//     delete verifyData.CheckMacValue;

//     const calculatedCheckMac = generateCheckMacValue(
//       verifyData,
//       ECPAY_CONFIG.HashKey,
//       ECPAY_CONFIG.HashIV
//     );

//     if (receivedCheckMac !== calculatedCheckMac) {
//       console.error('綠界通知檢查碼驗證失敗');
//       return res.status(400).send('0|CheckMacValue Error');
//     }

//     // 取得原始訂單ID
//     const originalOrderId = data.CustomField1;
//     const paymentStatus = data.RtnCode === '1' ? 'paid' : 'failed';
//     const orderStatus = data.RtnCode === '1' ? 'confirmed' : 'cancelled';

//     // 更新資料庫訂單狀態
//     /*
//     await Order.findByIdAndUpdate(originalOrderId, {
//       paymentStatus: paymentStatus,
//       orderStatus: orderStatus,
//       ecpayRtnCode: data.RtnCode,
//       ecpayRtnMsg: data.RtnMsg,
//       ecpayTradeNo: data.MerchantTradeNo,
//       ecpayPaymentDate: data.PaymentDate,
//       ecpayPaymentType: data.PaymentType,
//       updatedAt: new Date()
//     });
//     */

//     console.log(`訂單 ${originalOrderId} 付款狀態更新: ${paymentStatus}`);

//     // 這裡可以加入其他業務邏輯，如：
//     // - 發送確認 email
//     // - 更新庫存
//     // - 觸發出貨流程等

//     // 必須回傳 1|OK 給綠界
//     res.send('1|OK');

//   } catch (error) {
//     console.error('處理綠界付款通知錯誤:', error);
//     res.send('0|System Error');
//   }
// });

// // 付款完成返回頁面 (GET/POST by 綠界)
// router.all('/ecpay/return', (req, res) => {
//   try {
//     const data = req.method === 'POST' ? req.body : req.query;
//     const originalOrderId = data.CustomField1;
//     const rtnCode = data.RtnCode;

//     console.log('用戶從綠界返回:', { originalOrderId, rtnCode });

//     // 導向前端結果頁面
//     const resultUrl = `${ECPAY_CONFIG.ClientBackURL}?orderId=${originalOrderId}&status=${rtnCode}`;
//     res.redirect(resultUrl);

//   } catch (error) {
//     console.error('處理綠界返回錯誤:', error);
//     res.redirect(`${ECPAY_CONFIG.ClientBackURL}?status=error`);
//   }
// });

// // 查詢訂單狀態 API
// router.get('/status/:orderId', async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     // 從資料庫查詢訂單
//     /*
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: '找不到訂單'
//       });
//     }
//     */

//     // 模擬回傳 (請替換為實際的資料庫查詢)
//     const mockOrderStatus = {
//       orderId: orderId,
//       paymentStatus: 'pending', // pending, paid, failed
//       orderStatus: 'processing', // processing, confirmed, shipped, delivered, cancelled
//       // ecpayTradeNo: order.ecpayTradeNo,
//       // ecpayRtnMsg: order.ecpayRtnMsg,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     };

//     res.json({
//       success: true,
//       order: mockOrderStatus
//     });

//   } catch (error) {
//     console.error('查詢訂單狀態錯誤:', error);
//     res.status(500).json({
//       success: false,
//       message: '查詢訂單狀態失敗'
//     });
//   }
// });

// module.exports = router;

// const colors = ["red", "green", "blue"];

// console.log(colors.slice(0, 5));
