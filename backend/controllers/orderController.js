import asyncHandler from "express-async-handler";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import OrderModal from "../models/orderModel.js";

import cartModel from "../models/cartModel.js";
import { createOrderSchemaFn } from "../middlewares/joiValidation.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const setupOrder = asyncHandler(async (req, res) => {
  const { error, value } = createOrderSchemaFn(req.body);

  const prodOfCart = await cartModel.findOne({ userId: req.user._id });

  if (value.totalPrice !== prodOfCart.totalPrice) {
    res.status(400);
    throw new Error("抓到你偷改前端資料");
  }

  if (error) {
    res.status(400);
    throw new Error(error.details.map((e) => e.message).join(", "));
  }

  try {
    let existingOrder = await OrderModal.findOne({
      user: req.user._id,
      status: "pending",
    });

    if (existingOrder) {
      res.status(200).json({
        success: true,
        message: "已有待付款訂單，直接返回",
        order: existingOrder,
        reused: true,
      });
      throw new Error("發現一筆待付訂單");
    }

    const newOrder = await OrderModal.create({
      user: req.user._id,
      orderItems: value.items.map((e) => ({
        product: e.product,
        name: e.prodName,
        quantity: e.quantity,
        price: e.price,
      })),
      shipAddress: value.address,
      paymentMethod: value.paymentMethod,
      totalAmount: value.totalAmount,
      shippingPrice: 0,
      totalPrice: value.totalPrice,
    });

    //console.log(newOrder);

    res
      .status(201)
      .json({ success: true, message: "成功製作出訂單", order: newOrder });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// export const getOrderInfo = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const order = await OrderModal.findOne({ user: userId, status: "paid" })
//     .sort({ createdAt: -1 })
//     .lean();

//   if (!order) {
//     res.status(404);
//     throw new Error("查無此訂單");
//   }

//   order.createdAtFormatted = dayjs(order.createdAt)
//     .tz("Asia/Taipei")
//     .format("YYYY/MM/DD HH:mm");

//   console.log(order);

//   res.json(order);
// });

export const getOrderInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { all, sort } = req.query;

  const sortOrder = sort === "asc" ? 1 : -1;

  let orders;

  if (all === "true") {
    orders = await OrderModal.find({ user: userId, status: "paid" })
      .sort({ createdAt: sortOrder })
      .lean();

    if (!orders) {
      res.status(404);
      throw new Error("查無此訂單");
    }

    orders = await orders.map((item) => ({
      ...item,
      createdAtFormatted: dayjs(item.createdAt)
        .tz("Asia/Taipei")
        .format("YYYY/MM/DD HH:mm"),
    }));
    console.log("all", orders);
    res.json(orders);
  } else {
    orders = await OrderModal.findOne({ user: userId, status: "paid" })
      .sort({ createdAt: -1 })
      .lean();

    if (!orders) {
      res.status(404);
      throw new Error("查無此訂單");
    }

    orders.createdAtFormatted = dayjs(orders.createdAt)
      .tz("Asia/Taipei")
      .format("YYYY/MM/DD HH:mm");

    console.log("single", orders);

    res.json([orders]);
  }

  // const order = await OrderModal.findOne({ user: userId, status: "paid" })
  //   .sort({ createdAt: -1 })
  //   .lean();

  // if (!order) {
  //   res.status(404);
  //   throw new Error("查無此訂單");
  // }

  // order.createdAtFormatted = dayjs(order.createdAt)
  //   .tz("Asia/Taipei")
  //   .format("YYYY/MM/DD HH:mm");

  // console.log(order);

  // res.json(order);
});
