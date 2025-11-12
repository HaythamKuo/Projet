import fs from "fs";
import path from "path";
import Joi from "joi";
// import categoryData from "../utils/categories.json" assert { type: "json" };

const categoryData = JSON.parse(
  fs.readFileSync(path.resolve("../utils/categories.json"), "utf-8")
);

const categoryMap = categoryData.reduce((acc, item) => {
  acc[item.id] = item.subCategory;
  return acc;
}, {});

//遍歷並取出key
const mainKey = Object.keys(categoryMap);

export const selectedRuleSchema = Joi.object({
  mainCategory: Joi.string()
    .valid(...mainKey)
    .required(),
  subCategory: Joi.string()
    .required()
    .custom((value, helper) => {
      //取出當前被驗證值的第一項 在此處就是取出mainCategory
      const { mainCategory } = helper.state.ancestors[0];
      if (!mainCategory) return helper.message("遺失主要屬性");

      const validSub = categoryMap[mainCategory];
      if (!validSub.includes(value))
        return helper.message(`${value}不是${mainCategory}的子屬性`);

      return value;
    }),
});
