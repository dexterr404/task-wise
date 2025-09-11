import express from "express"
import { getAllTasks,getTaskById,createTask,updateTask,deleteTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/:userId/", protect, getAllTasks);
router.get("/:userId/:id", protect, getTaskById);
router.post("/:userId/", protect, createTask);
router.put("/:userId/:id", protect, updateTask);
router.delete("/:userId/:id", protect, deleteTask);


export default router