import mongoose, { Schema } from "mongoose";

const imageSchema = Schema({
  url: { type: String, required: true },
  alt: { type: String, default: "飯粒圖片" },
});

const prodSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 10,
      minLength: 2,
    },
    price: { type: Number, required: true, min: 0 },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      minLength: 2,
    },
    category: { index: true, type: String, default: "dogs" },
    stock: { min: 0, default: 0, type: Number },
    rate: { min: 1, default: 5, type: Number, required: true },
    images: [imageSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const prodModel = mongoose.model("Product", prodSchema);
export default prodModel;
