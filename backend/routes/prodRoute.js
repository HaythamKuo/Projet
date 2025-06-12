import { Router } from "express";
import { addNewProd, getAllProds } from "../controllers/prodController.js";
import { getImgsAuth } from "../controllers/imgController.js";

const prodRouter = Router();

prodRouter.route("/addnew").post(addNewProd);
prodRouter.route("/getprods").get(getAllProds);

prodRouter.route("/getimgs").get(getImgsAuth);

export default prodRouter;
