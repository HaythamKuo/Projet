import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../config/passport.js";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const googleAuthRouter = Router();

//指向登入
googleAuthRouter.get(
  "/auth/google/",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

googleAuthRouter.get(
  "/auth/google/bind/",
  passport.authenticate("google-bind", {
    scope: ["email", "profile"],
    // 可以加其他選項，例如 prompt: "select_account" 讓使用者可以選不同帳號
    //prompt: "select_account",
  })
);

googleAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    //failureRedirect: "http://localhost:5173/products",
    failureRedirect: `${process.env.CLIENT_ROUTE_DEV}/products`,
    //successRedirect: "/",
    session: false,
  }),
  //透過google登入
  async (req, res) => {
    try {
      // 這裡完全不管 cookie，因為使用者是登出狀態
      let user = await userModel.findOne({ googleId: req.user.id });

      if (!user) {
        // 第一次用 Google 登入 → 建立帳號
        user = await userModel.create({
          name: req.user.displayName,
          email: req.user.emails[0].value,
          googleId: req.user.id,
          authProvider: "google",
        });

        // user = await userModel.findOneAndUpdate(
        //   { email: req.user.emails[0].value },
        //   {
        //     name: req.user.displayName,
        //     googleId: req.user.id,
        //     authProvider: "google",
        //   },
        //   { new: true, upsert: true }
        // );
      }

      // 這裡才發 token
      generateToken(res, user._id);

      return res.redirect(`${process.env.CLIENT_ROUTE_DEV}/profile`);
    } catch (err) {
      console.error("Google login error:", err);
      return res.redirect(`${process.env.CLIENT_ROUTE_DEV}/products`);
    }
  }
);

googleAuthRouter.get(
  "/auth/google/bind/callback",
  passport.authenticate("google-bind", {
    failureRedirect: `${process.env.CLIENT_ROUTE_DEV}/products`,
    session: false,
  }),
  async (req, res) => {
    try {
      // 驗證 cookie → 找目前已登入的 user

      const token = req.cookies.jwt;
      if (!token) {
        return res.redirect(`${process.env.CLIENT_ROUTE_DEV}/auth`);
      }

      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      const localUser = await userModel.findById(userId);
      //除錯 避免不必要的錯誤
      if (!localUser)
        return res.redirect(`${process.env.CLIENT_ROUTE_DEV}/auth`);

      /**
       * 註冊google -> 註冊本地-> 註冊google(綁原來帳戶)
       * 1. 檢查google id 是否相似
       */

      const GooUser = await userModel.findOne({ googleId: req.user.id });

      if (GooUser) {
        return res.redirect(
          `${process.env.CLIENT_ROUTE_DEV}/profile?bind=failed`
        );
      }

      //2. 檢查mail有沒有相似
      const mailUser = await userModel.findOne({
        email: req.user.emails[0].value,
        _id: { $ne: localUser._id },
      });
      if (mailUser) {
        return res.redirect(
          `${process.env.CLIENT_ROUTE_DEV}/profile?bind=email-conflict`
        );
      }

      // 綁定 Google
      localUser.googleId = req.user.id;
      localUser.authProvider = "local+google";
      localUser.optionMail = req.user.emails[0].value;
      localUser.optionName = req.user.displayName;
      await localUser.save();

      return res.redirect(`${process.env.CLIENT_ROUTE_DEV}/profile`);
    } catch (err) {
      console.error("Google bind error:", err);
      return res.redirect(`${process.env.CLIENT_ROUTE_DEV}/login`);
    }
  }
);

export default googleAuthRouter;
