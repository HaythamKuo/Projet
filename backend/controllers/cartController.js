import asyncHandler from "express-async-handler";
import cartModel from "../models/cartModel.js";

export const addOrUpdateCartItem = asyncHandler(async (req, res) => {
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

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId.toString()
  );

  if (existingItem) {
    // existingItem.selectedSizes = { ...selectedSizes };

    existingItem.selectedSizes = {
      S: existingItem.selectedSizes.S || 0 + selectedSizes.S || 0,
      M: existingItem.selectedSizes.M || 0 + selectedSizes.M || 0,
      L: existingItem.selectedSizes.L || 0 + selectedSizes.L || 0,
    };
    existingItem.quantity = quantities;
  } else {
    cart.items.push({
      quantity: quantities,
      unitPrice,
      selectedSizes,
      productId,
    });
  }

  //cart.items.reduce

  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );

  try {
    await cart.save();
    await cart.populate("items.productId");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cartData = await cartModel
    .findOne({ userId })
    .populate("items.productId");

  if (!cartData) {
    res.status(404);
    throw new Error("找不到購物車裡的資料");
  }

  res.status(200).json(cartData);
});

// export const removeCart = asyncHandler(async (req, res) => {
//   const { productId, sizeToRemove } = req.body;
//   const userId = req.user._id;

//   const cart = await cartModel.findOne({ userId });
//   if (!cart) {
//     res.status(400);
//     throw new Error("找不到購物車");
//   }

//   const itemIndex = cart.items.findIndex(
//     (item) => item.productId._id.toString() === productId.toString()
//   );

//   if (itemIndex === -1) throw new Error("找不到該商品");

//   const item = cart.items[itemIndex];

//   for (const [size, qty] of Object.entries(sizeToRemove)) {
//     //[[s,4],[m,5]]
//     if (item.selectedSizes[size] !== null) {
//       item.selectedSizes[size] -= qty;

//       if (item.selectedSizes[size] < 0) {
//         delete item.selectedSizes[size];
//       }
//     }
//   }

//   item.quantity = Object.values(item.selectedSizes).reduce(
//     (acc, size) => acc + size,
//     0
//   );

//   if (item.quantity === 0) {
//     cart.items.splice(itemIndex, 1);
//   }
//   cart.totalPrice = cart.items.reduce(
//     (acc, item) => acc + item.quantity * item.unitPrice,
//     0
//   );

//   res.status(201).json(cart);
// });

export const removeCart = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user._id.toString();
  if (!productId) {
    throw new Error("找不到該購物車裡的產品");
  }

  const cart = await cartModel.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("找不到購物車");
  }

  const originLen = cart.items.length;

  cart.items = cart.items.filter((item) => item._id.toString() !== productId);

  if (cart.items.length === originLen) {
    res.status(404);
    throw new Error("該商品不在購物車裡");
  }

  await cart.save();
  await cart.populate("item.productId");

  res.status(201).json(cart);
});
