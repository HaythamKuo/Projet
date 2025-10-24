import { Router } from "express";
import { protect } from "../middlewares/authMiddle.js";
import {
  registerUser,
  loginUser,
  specificUser,
  getUserProfile,
  logoutUser,
  editAddress,
  saveProducts,
  getCollections,
  removeFavorite,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/profile").get(protect, getUserProfile);
userRouter.route("/:id").get(protect, specificUser);
userRouter.route("/editaddress").put(protect, editAddress);
userRouter.route("/:id/favorites").get(protect, getCollections);
// userRouter.route("/:id/favorites/:productId").delete(protect, removeFavorite);
userRouter.route("/favorites/:productId").delete(protect, removeFavorite);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);
userRouter.route("/favorite/:productId").post(protect, saveProducts);

export default userRouter;
