import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addTeam,getTeams,getTeamsById,deleteTeam,updateTeam,getTeamByToken, joinTeamByToken, sendTeamInviteEmail} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", protect, getTeams);
router.get("/:id", protect, getTeamsById);
router.get("/invite/:inviteToken", getTeamByToken);
router.post("/invite/:inviteToken/join", protect, joinTeamByToken);
router.post("/invite/:teamId/invite-email", sendTeamInviteEmail);
router.post("/", protect, addTeam);
router.put("/:id", protect, updateTeam);
router.delete("/:id", protect, deleteTeam);

export default router