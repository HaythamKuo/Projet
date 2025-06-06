// import Joi from "joi";

// export const userJoiSchema = Joi.object({
//   name: Joi.string().min(2).max(50).required(),

//   email: Joi.string().email().required(),
//   password: Joi.string()
//     .min(6)
//     .max(20)
//     .pattern(/^[a-zA-Z0-9]+$/)
//     .required(),
// });

// export const validateUser = (data) => {
//   return userJoiSchema.validate(data);
// };

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
