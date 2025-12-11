import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy } from "passport-google-oauth20";

const googleUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : process.env.CLIENT_PRODUCTION;

const clientOptions = {
  callbackURL: `${googleUrl}/api/google/auth/google/callback`,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};
const dupicateOpts = {
  ...clientOptions,
  callbackURL: `${googleUrl}/api/google/auth/google/bind/callback`,
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
  done(null, profile);
}

passport.use("google", new Strategy(clientOptions, verifyCallback));
passport.use("google-bind", new Strategy(dupicateOpts, verifyCallback));

export default passport;
