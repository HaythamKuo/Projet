import { Router } from "express";
import { addOrUpdateCartItem, getCart } from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddle.js";

const cartRouter = Router();

//cartRouter.route("/").get(getCart);
cartRouter.route("/addgoods").post(protect, addOrUpdateCartItem);
cartRouter.route("/:userId").get(getCart);
// /addcart

export default cartRouter;
