import express from "express";
import { getInsights } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post('/insights/:id', protect, getInsights);

export default router