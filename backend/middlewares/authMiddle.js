// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import userModel from "../models/userModel";

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   // 1. 取 token
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   // 2. 如果拿不到 token，直接 401
//   if (!token) {
//     res.status(401);
//     throw new Error("沒有提供授權金鑰");
//   }

//   try {
//     // 3. 驗證並解碼
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 4. 撈使用者（不帶密碼）
//     req.user = await userModel.findById(decoded.id).select("-password");

//     // 5. 通過驗證
//     next();
//   } catch (error) {
//     res.status(401);
//     throw new Error("授權失敗，請重新登入");
//   }
// });

// export { protect };

// middleware/authMiddleware.js
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
