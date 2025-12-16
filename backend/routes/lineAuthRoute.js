import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import crypto from "crypto";
import axios from "axios";
import qs from "qs";
import jwt from "jsonwebtoken";
import { protect } from "../middlewares/authMiddle.js";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { unbindThird_party } from "../controllers/userController.js";

const isProduction = process.env.NODE_ENV === "production";

async function getLineToken(code, ckPath) {
  const tokenUrl = "https://api.line.me/oauth2/v2.1/token";

  const options = {
    grant_type: "authorization_code",
    code,
    redirect_uri: `${
      isProduction
        ? process.env.ECPAYRETURN_URL_PRODUCTION
        : "http://localhost:5001"
    }${ckPath}`,
    client_id: process.env.LINE_CLIENT_ID,
    client_secret: process.env.LINE_CLIENT_SECRET,
  };

  const lineRes = await axios.post(tokenUrl, qs.stringify(options), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return lineRes.data;
}

// const line_obj = {
//   response_type: "code",
//   client_id: process.env.LINE_CLIENT_ID,
//   redirect_uri: `${
//     isProduction
//       ? process.env.ECPAYRETURN_URL_PRODUCTION
//       : "http://localhost:5001"
//   }/api/line/callback`,
//   state: STATE,
//   scope: "email openid profile",
// };

// const line_bind = {
//   ...line_obj,
//   redirect_uri: `${
//     isProduction
//       ? process.env.ECPAYRETURN_URL_PRODUCTION
//       : "http://localhost:5001"
//   }/api/line/bind/callback`,
// };

const lineAuthRouter = Router();

lineAuthRouter.get("/lineauth", async (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");
  res.cookie("line_auth_state", state, {
    httpOnly: true,
    secure: isProduction,
    maxAge: 5 * 60 * 1000,
  });

  // const lintStr = new URLSearchParams(line_obj).toString();

  const query = qs.stringify({
    response_type: "code",
    client_id: process.env.LINE_CLIENT_ID,
    redirect_uri: `${
      isProduction
        ? process.env.ECPAYRETURN_URL_PRODUCTION
        : "http://localhost:5001"
    }/api/line/callback`,
    state,
    scope: "email openid profile",
  });

  // const finalUrl = `https://access.line.me/oauth2/v2.1/authorize?${lintStr}`;
  const finalUrl = `https://access.line.me/oauth2/v2.1/authorize?${query}`;

  res.redirect(finalUrl);
});

lineAuthRouter.get("/callback", async (req, res) => {
  const { code, state, error } = req.query;

  const storeState = req.cookies.line_auth_state;

  if (!code || error)
    return res.redirect(
      `${
        isProduction
          ? process.env.CLIENT_PRODUCTION
          : process.env.CLIENT_ROUTE_DEV
      }/auth?error=user_denied`
    );
  if (!state || state !== storeState)
    return res.redirect(
      `${
        isProduction
          ? process.env.CLIENT_PRODUCTION
          : process.env.CLIENT_ROUTE_DEV
      }/auth?error=invalid_state`
    );

  try {
    // const lineRes = await axios.post(
    //   "https://api.line.me/oauth2/v2.1/token",
    //   qs.stringify({
    //     grant_type: "authorization_code",
    //     code,
    //     redirect_uri: `${
    //       isProduction
    //         ? process.env.ECPAYRETURN_URL_PRODUCTION
    //         : "http://localhost:5001"
    //     }/api/line/callback`,
    //     client_id: process.env.LINE_CLIENT_ID,
    //     client_secret: process.env.LINE_CLIENT_SECRET,
    //   }),
    //   {
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   }
    // );

    const data = await getLineToken(code, "/api/line/callback");
    // console.log(data);

    const { id_token } = data;
    // const { id_token } = lineRes.data;

    if (!id_token) {
      res.status(400);
      // throw new Error("登入過程中發生一些錯誤");
      return res.redirect(
        `${
          isProduction
            ? process.env.CLIENT_PRODUCTION
            : process.env.CLIENT_ROUTE_DEV
        }/auth?error=line_login_failed`
      );
    }

    const decodeUser = jwt.decode(id_token);

    // console.log(decodeUser);

    // 有分新會員跟已註冊會員

    let lineUser = await userModel.findOne({ lineId: decodeUser.sub });

    if (!lineUser) {
      lineUser = await userModel.create({
        name: decodeUser.name,
        email: decodeUser.email || null,
        lineId: decodeUser.sub,
        authProvider: ["line"],
      });
    }
    generateToken(res, lineUser._id);
    return res.redirect(
      `${
        isProduction
          ? process.env.CLIENT_PRODUCTION
          : process.env.CLIENT_ROUTE_DEV
      }/profile`
    );
  } catch (error) {
    console.error("跟 LINE 溝通失敗:", error.response?.data || error.message);
    res.status(400).json({ success: false, message: "登入失敗" });
  }
});

//指向綁定
lineAuthRouter.get("/bind", protect, async (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");
  res.cookie("line_bind_state", state, {
    httpOnly: true,
    secure: isProduction,
    maxAge: 5 * 60 * 1000,
  });

  const query = qs.stringify({
    response_type: "code",
    client_id: process.env.LINE_CLIENT_ID,
    redirect_uri: `${
      isProduction
        ? process.env.ECPAYRETURN_URL_PRODUCTION
        : "http://localhost:5001"
    }/api/line/bind/callback`,
    state,
    scope: "email openid profile",
  });

  // const lineStr = new URLSearchParams(line_bind).toString();

  const finalUrl = `https://access.line.me/oauth2/v2.1/authorize?${query}`;

  res.redirect(finalUrl);
});

lineAuthRouter.get("/bind/callback", async (req, res) => {
  const { code, state, error } = req.query;

  const storeState = req.cookies.line_bind_state;

  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect(
      `${
        isProduction
          ? process.env.CLIENT_PRODUCTION
          : process.env.CLIENT_ROUTE_DEV
      }/auth?error=not_logged_in`
    );
  }

  if (error || !state || state !== storeState) {
    return res.redirect(
      `${
        isProduction
          ? process.env.CLIENT_PRODUCTION
          : process.env.CLIENT_ROUTE_DEV
      }/auth?error=invalid_state`
    );
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const localUser = await userModel.findById(userId);

    if (!localUser) throw new Error("找不到該使用者");

    // const lineRes = await axios.post(
    //   "https://api.line.me/oauth2/v2.1/token",
    //   qs.stringify({
    //     grant_type: "authorization_code",
    //     code,
    //     redirect_uri: `${
    //       isProduction
    //         ? process.env.ECPAYRETURN_URL_PRODUCTION
    //         : "http://localhost:5001"
    //     }/api/line/bind/callback`,
    //     client_id: process.env.LINE_CLIENT_ID,
    //     client_secret: process.env.LINE_CLIENT_SECRET,
    //   }),
    //   {
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   }
    // );
    const data = await getLineToken(code, "/api/line/bind/callback");

    const { id_token } = data;
    if (!id_token) throw new Error("登入過程中發生一些錯誤");

    const decodeUser = jwt.decode(id_token);
    const lineUserId = decodeUser.sub;

    const existingUser = await userModel.findOne({ lineId: lineUserId });

    if (existingUser) {
      //本地使用者轉向綁定已擁有的lineacc
      if (existingUser._id.toString() !== localUser._id.toString()) {
        return res.redirect(
          `${
            isProduction
              ? process.env.CLIENT_PRODUCTION
              : process.env.CLIENT_ROUTE_DEV
          }/profile?tab=third-party&error=conflict`
        );
      } else {
        return res.redirect(
          `${
            isProduction
              ? process.env.CLIENT_PRODUCTION
              : process.env.CLIENT_ROUTE_DEV
          }/profile?tab=third-party&error=line_already_bound`
        );
      }
    }

    localUser.lineId = decodeUser.sub;
    if (!localUser.authProvider.includes("line")) {
      localUser.authProvider.push("line");
    }

    await localUser.save();

    res.redirect(
      `${
        isProduction
          ? process.env.CLIENT_PRODUCTION
          : process.env.CLIENT_ROUTE_DEV
      }/profile`
    );
  } catch (error) {
    console.error("LINE Bind Error:", error);
    return res.redirect(
      `${
        isProduction
          ? process.env.CLIENT_PRODUCTION
          : process.env.CLIENT_ROUTE_DEV
      }/profile?tab=third-party&error=bind_failed`
    );
  }
});

//指向解除綁定
// lineAuthRouter.delete("/unbind", async (req, res) => {
//   try {
//     const lineToken = req.cookies.jwt;
//     //應該可以拋錯
//     if (!lineToken) return res.sendStatus(401);
//     const { userId } = jwt.verify(lineToken, process.env.JWT_SECRET);

//     const user = await userModel.findById(userId);
//     if (!user) return res.sendStatus(401);
//     if (!user.lineId) throw new Error("沒有綁定line帳戶");

//     //導向到設定密碼頁面 res.redirect(...)
//     if (!user.password) throw new Error("請先設定密碼");

//     user.lineId = null;
//     user.optionMail = null;
//     user.optionName = null;

//     const newIdentity = user.authProvider.filter((item) => item !== "line");
//     user.authProvider = [...newIdentity];
//     await user.save();
//     res.status(201).json({ message: "成功解除綁定" });
//   } catch (error) {
//     console.error(error);
//   }
// });

lineAuthRouter.delete("/unbind", unbindThird_party);

export default lineAuthRouter;
