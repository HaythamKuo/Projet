import mongoose, { Schema } from "mongoose";

const orderSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
    shipAddress: { type: String, required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["credit_card", "linepay"],
    },
    paymentResult: {
      transactionId: { type: String },
      status: { type: String },
      updateTime: { type: String },
    },
    itemPrice: { type: Number, required: true },
    shippingPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    status: {
      type: String,
      enum: ["pending", "processing", "paid", "failed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const OrderModal = mongoose.model("Order", orderSchema);
export default OrderModal;
