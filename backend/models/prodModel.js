import mongoose, { Schema } from "mongoose";

const imageSchema = Schema({
  url: { type: String, required: true },
  alt: { type: String, default: "飯粒圖片" },
  // displayDescription: {
  //   type: String,

  //   maxLength: 500,
  //   minLength: 10,
  //   required: true,
  //   trim: true,
  // },
});

const prodSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 15,
      minLength: 2,
    },
    price: { type: Number, required: true, min: 0 },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
      minLength: 2,
    },
    mainCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    size: {
      S: { type: Number, required: true, min: 0 },
      M: { type: Number, required: true, min: 0 },
      L: { type: Number, required: true, min: 0 },
    },

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
