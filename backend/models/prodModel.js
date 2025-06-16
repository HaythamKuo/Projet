import mongoose, { Schema } from "mongoose";

const prodSchema = Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    category: { index: true, type: String, default: "dogs" },
    stock: { min: 0, default: 0, type: Number },
    rate: { min: 1, default: 5, type: Number, required: true },
    images: { type: [String] },
  },
  { timestamps: true }
);

const prodModel = mongoose.model("Product", prodSchema);
export default prodModel;
