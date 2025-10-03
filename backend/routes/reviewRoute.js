import { Router } from "express";
import { protect } from "../middlewares/authMiddle.js";
import {
  submitReviews,
  getReviews,
  fetchGroupReviews,
} from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter.route("/order/:orderId").get(protect, getReviews);
reviewRouter.route("/create-review").post(protect, submitReviews);
reviewRouter.route("/fetchjointreview/:productId").get(fetchGroupReviews);

export default reviewRouter;
