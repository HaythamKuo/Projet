import { Router } from "express";
import { addNewProd } from "../controllers/prodController.js";

const prodRouter = Router();

prodRouter.route("/addnew").post(addNewProd);

export default prodRouter;
