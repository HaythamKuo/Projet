import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import userModel from "../models/userModel.js";

const clientOptions = {
  callbackURL: "http://localhost:5001/api/google/auth/google/callback",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
  //console.log("google profile", profile);
  done(null, profile);
}

passport.use(new Strategy(clientOptions, verifyCallback));

export default passport;
