import { Router } from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const googleAuthRouter = Router();

//指向登入
googleAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/products",
    //successRedirect: "/",
    session: false,
  }),
  async (req, res) => {
    // let user = await userModel.findOne({ googleId: req.user.id });

    // //console.log("req.user", req.user);

    // if (!user) {
    //   const existingUser = await userModel.findOne({
    //     email: req.user.emails[0].value,
    //   });

    //   //如果本地使用者使用google登入就會進行綁定
    //   if (existingUser) {
    //     //綁定綁定google
    //     existingUser.googleId = req.user.id;
    //     existingUser.authProvider = "local+google";
    //     await existingUser.save();
    //     user = existingUser;
    //     res.json({
    //       success: true,
    //       message: "Google 帳號已經綁定到你的帳號",
    //       user,
    //     });
    //   } else {
    //     user = await userModel.create({
    //       name: req.user.displayName,
    //       email: req.user.emails[0].value,
    //       googleId: req.user.id,
    //       authProvider: "google",
    //     });
    //   }
    // }

    // generateToken(res, user._id);
    // res.redirect("http://localhost:5173");

    try {
      // 1. 先找該筆用戶有沒有綁定google account
      let user = await userModel.findOne({ googleId: req.user.id });

      if (!user) {
        // 2. 如果沒有再找他的信箱 如果有就綁定google account
        const existingUser = await userModel.findOne({
          email: req.user.emails[0].value,
        });

        if (existingUser) {
          // 3. 綁定google account

          existingUser.googleId = req.user.id;
          existingUser.authProvider = "local+google";
          await existingUser.save();
          user = existingUser;
        } else {
          // 4. 如果沒有找到信箱 就代表是第一次註冊(透過google Oauth)
          user = await userModel.create({
            name: req.user.displayName,
            email: req.user.emails[0].value,
            googleId: req.user.id,
            authProvider: "google",
          });
        }
      }
      // 發 JWT 存 cookie

      //console.log(user);

      generateToken(res, user._id);

      // 統一導回前端
      return res.redirect("http://localhost:5173");
    } catch (error) {
      return res.redirect("http://localhost:5173/products");
    }
  }
);

export default googleAuthRouter;
