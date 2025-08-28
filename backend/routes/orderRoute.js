import { Router } from "express";
import { protect } from "../middlewares/authMiddle.js";
import { setupOrder } from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.route("/").post(protect, setupOrder);

export default orderRouter;
