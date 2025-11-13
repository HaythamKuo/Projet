import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
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

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const categoryData = JSON.parse(
  fs.readFileSync(path.resolve(__dirName, "../utils/categories.json"), "utf-8")
);

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
