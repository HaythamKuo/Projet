import passport from "passport";
import { Strategy } from "passport-google-oauth20";

const clientOptions = {
  callbackURL: "http://localhost:5001/api/google/auth/google/callback",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};
const dupicateOpts = {
  ...clientOptions,
  callbackURL: "http://localhost:5001/api/google/auth/google/bind/callback",
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
  //console.log("google profile", profile);
  done(null, profile);
}

passport.use("google", new Strategy(clientOptions, verifyCallback));
passport.use("google-bind", new Strategy(dupicateOpts, verifyCallback));

export default passport;
