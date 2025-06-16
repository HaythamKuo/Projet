import { Router } from "express";
import { uploadProd, getAllProds } from "../controllers/prodController.js";
import upload from "../middlewares/multerConfig.js";

const prodRouter = Router();

prodRouter.route("/createpord").post(upload.single("images"), uploadProd);
prodRouter.route("/").get(getAllProds);

export default prodRouter;
