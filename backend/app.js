import express from "express";
import dotenv from "dotenv";
import router from "./routes/indexRoute.js";
import errHandler from "./middlewares/ErrMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由 (示例)
app.use("/api/goals", router);
app.use(errHandler);

export default app;
