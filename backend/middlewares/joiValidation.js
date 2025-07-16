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

const editProdSchema = Joi.object({
  ...baseProdSchema,
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

  stock: Joi.number().integer().min(0).optional().messages({
    "number.base": "庫存必須為數字",
    "number.integer": "庫存必須為整數",
  }),
  rate: Joi.number().min(0).max(5).optional().messages({
    "number.base": "評分必須為數字",
    "number.min": "評分不能小於 0",
    "number.max": "評分不能大於 5",
  }),
});

export const createProdSchemaFn = (data) =>
  createProdSchema.validate(data, { abortEarly: false });
