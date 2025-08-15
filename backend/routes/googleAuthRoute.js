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
    failureRedirect: "/",
    //successRedirect: "/",
    session: false,
  }),
  async (req, res) => {
    let user = await userModel.findOne({ googleId: req.user.id });

    //console.log("req.user", req.user);

    if (!user) {
      const existingUser = await userModel.findOne({
        email: req.user.emails[0].value,
      });

      if (existingUser) {
        //綁定綁定google
        existingUser.googleId = req.user.id;
        existingUser.authProvider = "local+google";
        await existingUser.save();
        user = existingUser;
        res.json({
          success: true,
          message: "Google 帳號已經綁定到你的帳號",
          user,
        });
      } else {
        user = await userModel.create({
          name: req.user.displayName,
          email: req.user.emails[0].value,
          googleId: req.user.id,
          authProvider: "google",
        });
      }
    }

    generateToken(res, user._id);
    res.redirect("/");
  }
);

export default googleAuthRouter;
