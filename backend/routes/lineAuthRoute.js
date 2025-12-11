import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import crypto from "crypto";
import axios from "axios";
import qs from "qs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const isProduction = process.env.NODE_ENV === "production";

const lineAuthRouter = Router();

const STATE = crypto.randomBytes(16).toString("hex");

const lintStr = new URLSearchParams({
  response_type: "code",
  client_id: process.env.LINE_CLIENT_ID,
  redirect_uri: `${
    isProduction
      ? process.env.ECPAYRETURN_URL_PRODUCTION
      : "http://localhost:5001"
  }/api/line/callback`,
  state: STATE,
  scope: "email openid profile",
}).toString();

lineAuthRouter.get("/lineauth", async (req, res) => {
  const finalUrl = `https://access.line.me/oauth2/v2.1/authorize?${lintStr}`;

  res.redirect(finalUrl);
});

lineAuthRouter.get("/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const lineRes = await axios.post(
      "https://api.line.me/oauth2/v2.1/token",
      qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: `${
          isProduction
            ? process.env.ECPAYRETURN_URL_PRODUCTION
            : "http://localhost:5001"
        }/api/line/callback`,
        client_id: process.env.LINE_CLIENT_ID,
        client_secret: process.env.LINE_CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { id_token } = lineRes.data;

    if (!id_token) {
      res.status(400);
      throw new Error("登入過程中發生一些錯誤");
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
    return res.redirect(`${process.env.CLIENT_ROUTE_DEV}/profile`);
    // res.json({ success: true, name: lineUser.name, email: lineUser.email });
  } catch (error) {
    console.error("跟 LINE 溝通失敗:", error.response?.data || error.message);
    res.status(400).json({ success: false, message: "登入失敗" });
  }
});

export default lineAuthRouter;
