import asyncHandler from "express-async-handler";
import cartModel from "../models/cartModel.js";

export const addOrUpdateCartItem = asyncHandler(async (req, res) => {
  // 名字 價錢 圖片 數量
  //const { name, price, quantity, images } = req.body;
  //要把商品的id放進去才能建立購物車
  const { productId, selectedSizes, unitPrice } = req.body;
  const userId = req.user._id;

  if (!productId || !unitPrice || typeof selectedSizes !== "object") {
    res.status(400);
    throw new Error("缺少產品id或是單價 尺寸");
  }

  const quantities = Object.values(selectedSizes).reduce(
    (acc, size) => acc + size,
    0
  );

  if (
    !Object.values(selectedSizes).every(
      (qty) => typeof qty === "number" && qty >= 0
    )
  ) {
    res.status(400);
    throw new Error("商品尺寸加總不應為0");
  }

  let cart = await cartModel.findOne({ userId });
  if (!cart) cart = new cartModel({ userId, items: [], totalPrice: 0 });

  // function transformAndCompare(sizeA, sizeB) {
  //   const planA =
  //     sizeA instanceof Map ? Object.fromEntries(sizeA.entries()) : sizeA;
  //   const planB =
  //     sizeB instanceof Map ? Object.fromEntries(sizeB.entries()) : sizeB;

  //   const keyA = Object.keys(planA);
  //   const keyB = Object.keys(planB);

  //   if (keyA.length !== keyB.length) return false;

  //   return keyA.every(
  //     (key) => planB.hasOwnProperty(key) && planA[key] === planB[key]
  //   );
  // }

  function compareSize(a, b) {
    const keyA = Object.keys(a);
    const keyB = Object.keys(b);

    if (keyA.length !== keyB.length) return false;

    return keyA.every((key) => b.hasOwnProperty(key) && a[key] === b[key]);
  }

  const existingItem = cart.items.find(
    (item) =>
      item.productId.toString() === productId.toString() &&
      compareSize(item.selectedSizes, selectedSizes)
  );

  if (existingItem) {
    for (const [size, qty] of Object.entries(selectedSizes)) {
      existingItem.selectedSizes[size] =
        (existingItem.selectedSizes[size] || 0) + qty;
    }

    existingItem.quantity = Object.values(existingItem.selectedSizes).reduce(
      (acc, size) => acc + size,
      0
    );

    existingItem.unitPrice = unitPrice;
  } else {
    //const computedQty = Object.values(selectedSizes).reduce((sum, q) => sum + q, 0);
    cart.items.push({
      quantity: quantities,
      unitPrice,
      selectedSizes,
      productId,
    });
  }

  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );

  try {
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export const getCart = asyncHandler(async (req, res) => {
  const cartData = await cartModel
    .findOne({ userId: req.params.userId })
    .populate("items.productId");
  if (!cartData) {
    res.status(404);
    throw new Error("找不到購物車裡的資料");
  }

  res.status(200).json(cartData);
});
