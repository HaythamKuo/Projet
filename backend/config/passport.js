import passport from "passport";
//import {Stratgy as GoogleStrategy} from 'passport-google-oauth20'
import { Strategy } from "passport-google-oauth20";

const clientOptions = {
  callbackURL: "http://localhost:5001/api/google/auth/google/callback",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("google profile", profile);
  done(null, profile);
}

passport.use(new Strategy(clientOptions, verifyCallback));

export default passport;
