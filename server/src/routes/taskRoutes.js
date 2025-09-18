import express from "express"
import { getAllTasks,getTaskById,createTask,updateTask,deleteTask,archiveTask,unArchiveTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/:userId/", protect, getAllTasks);
router.get("/:userId/:id", protect, getTaskById);
router.post("/:userId/", protect, createTask);
router.put("/:userId/:id", protect, updateTask);
router.put("/:userId/tasks/:taskId/archive", protect, archiveTask);
router.put("/:userId/tasks/:taskId/unArchive", protect, unArchiveTask);
router.delete("/:userId/:id", protect, deleteTask);


export default router