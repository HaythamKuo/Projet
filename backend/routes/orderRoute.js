import { Router } from "express";
import { protect } from "../middlewares/authMiddle.js";
import { getOrderInfo, setupOrder } from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.route("/").post(protect, setupOrder);
orderRouter.route("/prodorders").get(protect, getOrderInfo);

export default orderRouter;
