import { Router } from "express";
import { protect } from "../middlewares/authMiddle.js";
import {
  registerUser,
  loginUser,
  specificUser,
  getUserProfile,
  logoutUser,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/profile").get(protect, getUserProfile);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/:id").get(specificUser);
userRouter.route("/").post(registerUser);

export default userRouter;
