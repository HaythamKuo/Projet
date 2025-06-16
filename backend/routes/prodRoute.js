import { Router } from "express";
import {
  uploadProd,
  getAllProds,
  getSpecificProd,
} from "../controllers/prodController.js";
import upload from "../middlewares/multerConfig.js";

const prodRouter = Router();

prodRouter.route("/createprod").post(upload.single("images"), uploadProd);
prodRouter.route("/").get(getAllProds);
prodRouter.route("/:id").get(getSpecificProd);

export default prodRouter;
