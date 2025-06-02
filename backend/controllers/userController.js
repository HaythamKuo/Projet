import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/joiValidation.js";

/**
 * @desc   註冊新使用者，同時把 JWT 放進 HttpOnly Cookie
 * @route  POST /api/users/register
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { error, value } = validateRegister(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const existUser = await userModel.findOne({ email: value.email });
  if (existUser) {
    res.status(400);
    throw new Error("已存在該使用者");
  }

  const newUser = await userModel.create({
    name: value.name,
    email: value.email,
    password: value.password,
  });

  generateToken(res, newUser._id);

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });
});

/**
 * @desc   核對帳密後回傳 User 資訊（同時把 JWT 放到 HttpOnly Cookie）
 * @route  POST /api/users/login
 * @access Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { error, value } = validateLogin(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const user = await userModel.findOne({ email: value.email });
  if (!user) {
    res.status(400);
    throw new Error("信箱或密碼錯誤");
  }

  const isMatch = await user.matchPassword(value.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("密碼錯誤");
  }

  generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

export const specificUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404);
    throw new Error("請提供使用者id");
  }

  const user = await userModel.findOne({ _id: id });

  res.status(200).json(user);
});
