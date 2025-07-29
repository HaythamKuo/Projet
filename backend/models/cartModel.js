import mongoose, { Schema } from "mongoose";

const CartItemSchema = Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, default: 1, min: 0, required: true },
  selectedSizes: {
    type: Object,
    default: {},
    required: true,
  },
  unitPrice: { type: Number, required: true },
  addAt: { type: Date, default: Date.now },
});

const CartSchema = Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    items: [CartItemSchema],
    totalPrice: { type: Number, required: true },
    updateAt: { type: Date, default: Date.now },
  },
  { timestamp: true }
);

const cartModel = mongoose.model("Cart", CartSchema);
export default cartModel;
