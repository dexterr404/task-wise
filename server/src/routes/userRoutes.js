import express from "express";
import { getUser,updateUser,deleteUser } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/:id", protect, getUser);
router.put("/:id", protect, upload.single("image"), updateUser);
router.delete("/:id", protect, deleteUser);

export default router;

