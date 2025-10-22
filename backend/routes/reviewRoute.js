import { Router } from "express";
import { protect } from "../middlewares/authMiddle.js";
import {
  submitReviews,
  getReviews,
  fetchGroupReviews,
} from "../controllers/reviewController.js";

const reviewRouter = Router();

//指向訂單的評論
reviewRouter.route("/order/:orderId").get(protect, getReviews);
reviewRouter.route("/create-review").post(protect, submitReviews);

//指向商品？
reviewRouter.route("/fetchjointreview/:productId").get(fetchGroupReviews);

export default reviewRouter;
