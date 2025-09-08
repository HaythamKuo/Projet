import { Router } from "express";
import {
  addOrUpdateCartItem,
  getCart,
  removeCart,
  emptiedCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddle.js";

const cartRouter = Router();

cartRouter.route("/addgoods").post(protect, addOrUpdateCartItem);
cartRouter.route("/").get(protect, getCart);
cartRouter.route("/emptiedcart").delete(protect, emptiedCart);
cartRouter.route("/:productId").delete(protect, removeCart);

export default cartRouter;
