import mongoose, { Schema } from "mongoose";

const imageSchema = Schema({
  url: { type: String, required: true },
  alt: { type: String, default: "飯粒圖片" },
  // displayDescription: {
  //   type: String,
  //   default: "",
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
      maxLength: 10,
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

// import Joi from "joi";
// import { CATEGORY_MAP, CATEGORY_LIST } from "./categoryOptions.js";

// const prodJoiSchema = Joi.object({
//   category: Joi.string()
//     .valid(...CATEGORY_LIST)
//     .required(),

//   subcategory: Joi.string()
//     .required()
//     .custom((value, helpers) => {
//       const { category } = helpers.state.ancestors[0]; // 從整體資料中取出 category

//       if (!category) {
//         // 如果 category 沒填，就先報錯
//         return helpers.error("subcategory.categoryMissing");
//       }

//       const validSubs = CATEGORY_MAP[category]; // 找到這個主分類底下的合法子分類清單

//       if (!validSubs.includes(value)) {
//         // 如果目前輸入的 subcategory 不在清單中
//         return helpers.error("subcategory.invalidForCategory", {
//           category,
//           value,
//         });
//       }

//       return value; // 驗證通過
//     })
//     .messages({
//       "subcategory.categoryMissing": "請先選擇有效的主分類 category。",
//       "subcategory.invalidForCategory": `"{{value}}" 不是分類 "{{category}}" 的有效子分類`,
//     }),
// });
