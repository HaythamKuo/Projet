import Joi from "joi";

// 1. 註冊要用的 schema (registerSchema)
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(15)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required(),
});

// 2. 登入要用的 schema (loginSchema)
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(15)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required(),
});

// 驗證函式
export const validateRegister = (data) => registerSchema.validate(data);
export const validateLogin = (data) => loginSchema.validate(data);

///// --我是分隔線-- /////

//抽取相同屬性
const baseProdSchema = {
  name: Joi.string().min(2).max(15).trim().required().messages({
    "any.required": "請填寫商品名稱",
    "string.empty": "商品名稱不可為空",
  }),
  price: Joi.number().positive().required().messages({
    "any.required": "請填寫價格",
    "number.base": "價格必須為數字",
    "number.positive": "價格必須為正數",
  }),
  description: Joi.string().min(2).max(50).trim().required().messages({
    "any.required": "請填寫商品描述",
    "string.empty": "商品描述不可為空",
  }),
};

const sizes = ["S", "M", "L"];

//這是尺寸庫存的schema
const sizeSchema = Joi.object(
  sizes.reduce((acc, size) => {
    acc[size] = Joi.number().integer().min(0).required().messages({
      "number.min": "庫存不能低於0",
      "number.base": "請輸入正整數",
    });
    return acc;
  }, {})
).custom((value, helpers) => {
  const totalStock = Object.values(value).reduce((sum, val) => sum + val, 0);
  if (totalStock === 0) {
    return helpers.message("至少需要一個尺寸有庫存");
  }
  return value;
});

const editProdSchema = Joi.object({
  ...baseProdSchema,
  size: sizeSchema,
  oldImages: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        alt: Joi.string().allow(""),
      }).unknown(true)
    )
    .required()
    .messages({ "array.base": "oldImages 必須是圖片陣列" }),
});

export const editProdSchemaFn = (data) =>
  editProdSchema.validate(data, { abortEarly: false });

// --分隔線-- //

const createProdSchema = Joi.object({
  ...baseProdSchema,
  size: sizeSchema,
  rate: Joi.number().min(1).max(5).optional().messages({
    "number.base": "評分必須為數字",
    "number.min": "評分不能小於 0",
    "number.max": "評分不能大於 5",
  }),
});

export const createProdSchemaFn = (data) =>
  createProdSchema.validate(data, { abortEarly: false });

// --分隔線-- //

//驗證訂單
const createOrderSchema = Joi.object({
  address: Joi.string()
    .trim()
    .required()
    .messages({ "string.empty": "取貨地點不能為空" }),

  totalAmount: Joi.number().integer().min(1).required().messages({
    "number.base": "品項數量應為正整數",
    "number.min": "品項數量不能為0",
  }),

  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string()
          .required()
          .messages({ "string.required": "後端缺少產品ID" }),
        prodName: Joi.string()
          .required()
          .messages({ "string.required": "缺少產品名稱" }),
        quantity: Joi.number().integer().required().min(1).messages({
          "number.base": "產品細項應為正整數",
          "number.min": "數量至少為1",
        }),
        price: Joi.number().min(0).required().messages({
          "number.base": "價格應為正整數",
          "number.min": "價格應大於0",
        }),
      })
    )
    .min(1)
    .required(),
  paymentMethod: Joi.string()
    .valid("credit_card", "linepay")
    .required()
    .messages({ "any.only": "付款方式不合法" }),
  totalPrice: Joi.number()
    .required()
    .min(0)
    .messages({ "number.base": "總價應大於0" }),
});

export const createOrderSchemaFn = (data) =>
  createOrderSchema.validate(data, { abortEarly: true });
