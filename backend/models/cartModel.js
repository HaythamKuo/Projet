import mongoose from "mongoose";

const CartItemSchema = new mongoose({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  quantity: { type: Number, default: 1, min: 1 },
  price: { type: Number, require: true },
  addAt: { type: Date, default: Date.now },
});

const CartSchema = new mongoose({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  items: [CartItemSchema],
  updateAt: { type: Date, default: Date.now },
});

const cartModel = mongoose.model("Cart", CartSchema);
export default cartModel;
