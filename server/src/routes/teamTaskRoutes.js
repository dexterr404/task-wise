import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getTeamTasks,createTeamTask,updateTeamTask,deleteTeamTask } from "../controllers/teamTaskController.js";

const router = express.Router();

router.get("/:teamId/tasks", protect, getTeamTasks);
router.post("/:teamId/tasks", protect, createTeamTask);
router.patch("/:teamId/tasks/:taskId", protect, updateTeamTask);
router.delete("/:teamId/tasks/:taskId", protect, deleteTeamTask);

export default router;