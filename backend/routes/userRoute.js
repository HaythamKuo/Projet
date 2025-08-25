import { Router } from "express";
import { protect } from "../middlewares/authMiddle.js";
import {
  registerUser,
  loginUser,
  specificUser,
  getUserProfile,
  logoutUser,
  editAddress,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/profile").get(protect, getUserProfile);
userRouter.route("/:id").get(protect, specificUser);
userRouter.route("/editaddress").put(protect, editAddress);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);

export default userRouter;
