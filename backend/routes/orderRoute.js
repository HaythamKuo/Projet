import { Router } from "express";
import { protect } from "../middlewares/authMiddle.js";
import {
  getOrderInfo,
  setupOrder,
  getSingleOrder,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.route("/").post(protect, setupOrder);
orderRouter.route("/prodorders").get(protect, getOrderInfo);
orderRouter.route("/prodorders/:orderId").get(protect, getSingleOrder);

export default orderRouter;
