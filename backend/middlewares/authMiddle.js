import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userModel from "../models/userModel";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split("")[1];

      const decoded = jwt.verify(token, process.envJWT_SECRET);

      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("沒有授權");
    }

    if (!token) {
      res.status(401);
      throw new Error("沒有授權及金鑰");
    }
  }
});

export { protect };
