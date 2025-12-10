import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";

import errHandler from "./middlewares/ErrMiddleware.js";

import userRouter from "./routes/userRoute.js";
import prodRouter from "./routes/prodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import ecPayRouter from "./routes/ecpayRoute.js";

import googleAuthRouter from "./routes/googleAuthRoute.js";
import lineAuthRouter from "./routes/lineAuthRoute.js";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_PRODUCTION
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "super secret",
    resave: false,
    // saveUninitialized: true,
    saveUninitialized: false,

    cookie: {
      domain: "d829337c43dd.ngrok-free.app",
      httpOnly: true,
      secure: true, // ngrok 是 HTTPS
      // sameSite: "lax", // JWT cookie 可用
      sameSite: "none",
    },
  })
);
app.use(express.urlencoded({ extended: true }));

//passport
app.use(passport.initialize());
app.use("/api/google", googleAuthRouter);
app.use("/api/line", lineAuthRouter);

// 路由 (示例)

app.use("/api/users", userRouter);
app.use("/api/prods", prodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRouter);
app.use("/api/ecpay", ecPayRouter);

app.use(errHandler);

export default app;
