import mongoose, { Schema } from "mongoose";

const reviewSchema = Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, // -> orders._id    ✅ 來源訂單
    rating: { type: Number, min: 1, max: 5, default: 1 }, // 1–5
    comment: { type: String, maxLength: 20, trim: true },
  },
  {
    timestamps: true,
  }
);

const reviewModal = mongoose.model("Review", reviewSchema);
export default reviewModal;
