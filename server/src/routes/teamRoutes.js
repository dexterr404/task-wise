import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addTeam,getTeams,deleteTeam } from "../controllers/teamController.js";

const router = express.Router();

router.get("/", protect, getTeams);
router.get("/:id", protect, );
router.post("/", protect, addTeam);
router.put("/:id", protect, );
router.delete("/:id", protect, deleteTeam);

export default router