import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getTeamTasks,createTeamTask,updateTeamTask,deleteTeamTask, toggleSubtaskStatus, archiveTeamTask, unArchiveTeamTask, getUserTeamTasks } from "../controllers/teamTaskController.js";

const router = express.Router();

router.get("/user/tasks", protect, getUserTeamTasks);
router.get("/:teamId/tasks", protect, getTeamTasks);
router.post("/:teamId/tasks", protect, createTeamTask);
router.patch("/:teamId/tasks/:taskId", protect, updateTeamTask);
router.patch("/:teamId/tasks/:taskId/subtask/:subtaskId", protect, toggleSubtaskStatus);
router.delete("/:teamId/tasks/:taskId", protect, deleteTeamTask);
router.put("/:teamId/tasks/:taskId/archive", protect, archiveTeamTask);
router.put("/:teamId/tasks/:taskId/unArchive", protect, unArchiveTeamTask);

export default router;