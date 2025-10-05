import express from "express";
import { chatWithAssistantBot, chatWithHelpBot, getInsights } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post('/insights/:id', protect, getInsights);
router.post('/chat/helpbot', chatWithHelpBot);
router.post('/chat/assistantbot', protect, chatWithAssistantBot);

export default router