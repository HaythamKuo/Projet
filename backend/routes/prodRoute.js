import { Router } from "express";
import {
  uploadProd,
  getAllProds,
  getSpecificProd,
  getMyProds,
  editMyProd,
  deleteMyProd,
} from "../controllers/prodController.js";
import upload from "../middlewares/multerConfig.js";
import { protect } from "../middlewares/authMiddle.js";

const prodRouter = Router();

prodRouter
  .route("/createprod")
  .post(protect, upload.array("images", 3), uploadProd);

prodRouter.route("/").get(getAllProds);
prodRouter.route("/mine").get(protect, getMyProds);
prodRouter.route("/deleteprod/:id").delete(protect, deleteMyProd);
prodRouter.route("/:id").get(protect, getSpecificProd);
prodRouter
  .route("/editprod/:id")
  .put(protect, upload.array("newImages", 3), editMyProd);

export default prodRouter;
