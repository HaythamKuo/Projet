import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt; // 從 cookie 裡拿

  if (!token) {
    res.status(401);
    throw new Error("沒有登入，請先登入");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 把 userId 放到 req.user 裡，下游 route 可以直接拿
    req.user = await userModel.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("JWT 驗證失敗，請重新登入");
  }
});
