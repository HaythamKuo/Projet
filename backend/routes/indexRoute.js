import express from "express";
import {
  deleteGoals,
  getGoals,
  postGoals,
  putGoals,
} from "../controllers/goalController.js";
const router = express.Router();

// router.get("/", getGoals);
// router.post("/", postGoals);
// router.put("/:id", putGoals);
// router.delete("/:id", deleteGoals);

router.route("/").get(getGoals).post(postGoals);
router.route("/:id").put(putGoals).delete(deleteGoals);

export default router;
