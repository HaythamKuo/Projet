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

prodSchema.index(
  {
    name: "text",
    mainCategory: "text",
    subCategory: "text",
    description: "text",
  },
  {
    weights: {
      name: 5,
      subCategory: 4,
      mainCategory: 3,
      description: 2,
    },
    name: "ProductTextIndex",
    default_language: "none",
  }
);

const prodModel = mongoose.model("Product", prodSchema);
export default prodModel;

// dogs = [
//     {"name": "Buddy", "price": 8000, "description": "活潑可愛", "subCategory": "黃金獵犬"},
//     {"name": "Luna", "price": 9000, "description": "溫柔聰明", "subCategory": "拉布拉多"},
//     {"name": "Charlie", "price": 7500, "description": "忠心護主", "subCategory": "德國牧羊犬"},
//     {"name": "Daisy", "price": 6000, "description": "小巧玲瓏", "subCategory": "吉娃娃"},
//     {"name": "Max", "price": 7000, "description": "勇敢好動", "subCategory": "哈士奇"},
//     {"name": "Bella", "price": 8500, "description": "甜美可愛", "subCategory": "柯基"},
//     {"name": "Rocky", "price": 7800, "description": "精力充沛", "subCategory": "比特犬"},
//     {"name": "Milo", "price": 8200, "description": "親人聰明", "subCategory": "貴賓犬"},
//     {"name": "Coco", "price": 6500, "description": "活力滿滿", "subCategory": "柴犬"},
//     {"name": "Lucky", "price": 7700, "description": "忠誠可愛", "subCategory": "鬆獅犬"}
// ]
