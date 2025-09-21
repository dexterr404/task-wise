import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getTeamInbox } from "../controllers/teamInboxController.js";

const router = express.Router();

router.get("/:teamId/inbox", protect, getTeamInbox);

export default router;