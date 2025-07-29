import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import router from "./routes/indexRoute.js";
import errHandler from "./middlewares/ErrMiddleware.js";

import userRouter from "./routes/userRoute.js";
import prodRouter from "./routes/prodRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// 路由 (示例)
app.use("/api/goals", router);
app.use("/api/users", userRouter);
app.use("/api/prods", prodRouter);
app.use("/api/cart", cartRouter);

app.use(errHandler);

export default app;
