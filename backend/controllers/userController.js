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
    if (
      existUser.authProvider.includes("google") &&
      !existUser.authProvider.includes("local")
    ) {
      existUser.name = value.name;
      existUser.password = value.password;
      existUser.authProvider = "local+google";
      await existUser.save();

      generateToken(res, existUser._id);

      res.status(201).json({
        success: true,
        message: "本地帳號已綁定 Google, 已自動完成密碼設定",
      });
      return;
    } else {
      //針對本地使用者信箱重複註冊
      res.status(400);
      throw new Error("此信箱已被註冊過");
    }
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

export const logoutUser = asyncHandler((req, res) => {
  res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "成功登出" });
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

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("這是getUserProfile的錯誤");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    googleId: user?.googleId || null,
  });
});
