import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import router from "./routes/indexRoute.js";
import errHandler from "./middlewares/ErrMiddleware.js";

import userRouter from "./routes/userRoute.js";
import prodRouter from "./routes/prodRoute.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// const imagekit = new ImageKit({
//   urlEndpoint: process.env.IK_URL_ENDPOINT,
//   publicKey: process.env.IK_PUBLIC_KEY,
//   privateKey: process.env.IK_PRIVATE_KEY,
// });

// app.get("/api/prods/getimgs", function (req, res) {

//   const { token, expire, signature } = imagekit.getAuthenticationParameters();
//   res.send({
//     token,
//     expire,
//     signature,
//     publicKey: process.env.IK_PUBLIC_KEY,
//   });
// });

// 路由 (示例)
app.use("/api/goals", router);
app.use("/api/users", userRouter);
app.use("/api/prods", prodRouter);
app.use(errHandler);

export default app;
