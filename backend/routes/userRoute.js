import { Router } from "express";
import {
  registerUser,
  loginUser,
  specificUser,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/:id").get(specificUser);
userRouter.route("/").post(registerUser);

export default userRouter;
