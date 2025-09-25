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
    }, // -> users._id     ✅ 評論者
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, // -> orders._id    ✅ 來源訂單
    rating: { type: Number, min: 1, max: 5 }, // 1–5
    comment: { type: String, minLength: 1, maxLength: 20 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamp: true,
  }
);

const reviewModal = mongoose.model("Review", reviewSchema);
export default reviewModal;
