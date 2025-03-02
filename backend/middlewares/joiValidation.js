import Joi from "joi";

export const userJoiSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required(),
});

export const validateUser = (data) => {
  return userJoiSchema.validate(data);
};
