import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserNotifications, markAllAsRead, markAsRead } from "../controllers/notificationController.js";

const router = express.Router();

router.put("/read/all", protect, markAllAsRead);
router.put("/:notifId/read", protect, markAsRead);
router.get("/", protect, getUserNotifications);


export default router;