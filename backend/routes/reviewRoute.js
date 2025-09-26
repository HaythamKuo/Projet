import { Router } from "express";
import { protect } from "../middlewares/authMiddle.js";
import { submitReviews } from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter.route("/create-review").post(protect, submitReviews);

export default reviewRouter;
