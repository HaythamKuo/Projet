import asyncHandler from "express-async-handler";
import OrderModal from "../models/orderModel.js";

export const setupOrder = asyncHandler(async (req, res) => {
  //console.log(req.body);
  //console.log(req.user._id);

  const { address, totalAmount, items, totalPrice, paymentMethod } = req.body;

  if (!address) {
    throw new Error("請提供取貨地點");
  }

  try {
    const newOrder = await OrderModal.create({
      user: req.user._id,
      orderItems: items.map((e) => ({
        product: e.product,
        name: e.prodName,
        quantity: e.quantity,
        price: e.price,
      })),
      shipAddress: address,
      paymentMethod,
      //itemPrice: items.map((e) => e.price),
      shippingPrice: 0,
      totalPrice,
      totalAmount,
    });

    //console.log(newOrder);

    res.status(201).json("成功製作出訂單");
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
