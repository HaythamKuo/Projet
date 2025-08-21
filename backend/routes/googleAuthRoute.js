import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../config/passport.js";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const googleAuthRouter = Router();

//指向登入
googleAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// googleAuthRouter.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "http://localhost:5173/products",
//     //successRedirect: "/",
//     session: false,
//   }),
//   async (req, res) => {
//     try {
//       // 1. 檢查 cookie (已登入的使用者)
//       const token = req.cookies.jwt;
//       const { userId } = jwt.verify(token, process.env.JWT_SECRET);
//       const localUser = await userModel.findById(userId);

//       // 如果沒登入 → 直接回登入頁
//       if (!localUser) {
//         return res.redirect("http://localhost:5173/auth");
//       }

//       // 2. 檢查是否已綁定 Google
//       let user = await userModel.findOne({ googleId: req.user.id });

//       console.log(user);

//       if (!user) {
//         // 如果這個 Google 還沒綁定任何帳號 → 綁到 localUser
//         if (!localUser) {
//           return res.redirect("http://localhost:5173/auth");
//         }
//         localUser.googleId = req.user.id;
//         localUser.authProvider = "local+google";
//         await localUser.save();
//         generateToken(res, localUser._id);
//         return res.redirect("http://localhost:5173/profile?bind=success");
//       } else {
//         // 4. 如果沒有找到信箱 就代表是第一次註冊(透過google Oauth)
//         user = await userModel.create({
//           name: req.user.displayName,
//           email: req.user.emails[0].value,
//           googleId: req.user.id,
//           authProvider: "google",
//         });
//       }

//       // 3. 如果 Google 已經綁定過 → 直接登入
//       generateToken(res, user._id);
//       return res.redirect("http://localhost:5173");
//     } catch (error) {
//       console.error(error);
//       return res.redirect("http://localhost:5173/products");
//     }
//   }
// );

googleAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/products",
    //successRedirect: "/",
    session: false,
  }),
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
      }

      // 這裡才發 token
      generateToken(res, user._id);

      return res.redirect("http://localhost:5173/profile");
    } catch (err) {
      console.error("Google login error:", err);
      return res.redirect("http://localhost:5173/products");
    }
  }
);

googleAuthRouter.get(
  "/auth/google/bind/callback",
  passport.authenticate(
    "google",
    { failureRedirect: "http://localhost:5173/products", session: false },
    async (req, res) => {
      try {
        // 驗證 cookie → 找目前已登入的 user
        const token = req.cookies.jwt;
        if (!token) {
          return res.redirect("http://localhost:5173/auth");
        }

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const localUser = await userModel.findById(userId);

        // if (!localUser) {
        //   return res.redirect("http://localhost:5173/auth");
        // }

        // 綁定 Google
        localUser.googleId = req.user.id;
        localUser.authProvider = "local+google";
        await localUser.save();

        return res.redirect("http://localhost:5173/profile");
      } catch (err) {
        console.error("Google bind error:", err);
        return res.redirect("http://localhost:5173/login");
      }
    }
  )
);

export default googleAuthRouter;
