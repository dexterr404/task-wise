import express from "express";
import { chatWithHelpBot, getInsights } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post('/insights/:id', protect, getInsights);
router.post('/chat', chatWithHelpBot);

export default router