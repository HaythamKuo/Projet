import { Router } from "express";
import {
  addOrUpdateCartItem,
  getCart,
  removeCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddle.js";

const cartRouter = Router();

cartRouter.route("/addgoods").post(protect, addOrUpdateCartItem);
cartRouter.route("/").get(protect, getCart);
cartRouter.route("/:productId").delete(protect, removeCart);

export default cartRouter;
