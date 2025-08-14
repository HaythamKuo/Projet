import { Router } from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";

const googleAuthRouter = Router();

//指向登入
googleAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    //failureRedirect: "/",
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log("google call us back");
  }
);

export default googleAuthRouter;
