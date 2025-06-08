import mongoose, { Schema } from "mongoose";

const prodSchema = Schema(
  {
    name: { type: String, require: true, trim: true },
    price: { type: Number, require: true, min: 0 },
    description: { type: String, require: true, trim: true },
    category: { index: true, type: String, require: true },
    stock: { min: 0, default: 0, type: Number, require: true },
    images: [
      {
        url: {
          type: String,
          require: true,
        },
        alt: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

const prodModel = mongoose.model("Product", prodSchema);
export default prodModel;
