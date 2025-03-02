import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import { validateUser } from "../middlewares/joiValidation.js";

// @desc register new user
// @route POST /api/users
// @acess public
export const registerUser = asyncHandler(async (req, res) => {
  const { error, value } = validateUser(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const existUser = await userModel.findOne({ email: value.email });
  if (existUser) {
    res.status(400);
    throw new Error("已存在該使用者");
  }

  const newUser = await userModel.create(value);
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser._id),
  });
});

// @desc authenticate  user
// @route GET /api/users/login
// @acess public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("郵件或密碼錯誤");
  }
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

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
