import { Router } from "express";
import { uploadProd } from "../controllers/prodController.js";
import upload from "../middlewares/multerConfig.js";

const prodRouter = Router();

prodRouter.route("/createpord").post(upload.single("images"), uploadProd);

export default prodRouter;
