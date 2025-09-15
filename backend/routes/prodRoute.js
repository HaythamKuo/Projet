import { Router } from "express";
import {
  uploadProd,
  getAllProds,
  getSpecificProd,
  getMyProds,
  editMyProd,
  deleteMyProd,
  searchProds,
} from "../controllers/prodController.js";
import upload from "../middlewares/multerConfig.js";
import { protect } from "../middlewares/authMiddle.js";
import categoryData from "../utils/categories.json" assert { type: "json" };

const prodRouter = Router();

prodRouter.route("/search").get(searchProds);
prodRouter
  .route("/createprod")
  .post(protect, upload.array("images", 3), uploadProd);

prodRouter.route("/").get(getAllProds);
prodRouter.route("/category").get((req, res) => {
  res.json(categoryData);
});
prodRouter.route("/mine").get(protect, getMyProds);
prodRouter.route("/deleteprod/:id").delete(protect, deleteMyProd);
prodRouter.route("/:id").get(getSpecificProd);
prodRouter
  .route("/editprod/:id")
  .put(protect, upload.array("newImages", 3), editMyProd);

export default prodRouter;
