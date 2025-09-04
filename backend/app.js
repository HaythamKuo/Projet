import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import passport from "passport";

import errHandler from "./middlewares/ErrMiddleware.js";

import userRouter from "./routes/userRoute.js";
import prodRouter from "./routes/prodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import ecPayRouter from "./routes/ecpayRoute.js";

import googleAuthRouter from "./routes/googleAuthRoute.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173 ", credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//passport
app.use(passport.initialize());
app.use("/api/google", googleAuthRouter);

//test
// app.get("/", (req, res) => {
//   return res.status(201).send("這裡是夭壽讚");
// });
// app.get("/api/protected", protect, (req, res) => {
//   res.json({ message: "驗證成功", user: req.user });
// });

// 路由 (示例)

app.use("/api/users", userRouter);
app.use("/api/prods", prodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/ecpay", ecPayRouter);

app.use(errHandler);

export default app;
