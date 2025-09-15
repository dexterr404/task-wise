import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addTeam,getTeams,getTeamsById,deleteTeam,updateTeam,getTeamByToken, joinTeamByToken, sendTeamInviteEmail,
removeUserFromTeam,changeUserRole} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", protect, getTeams);
router.get("/:teamId", protect, getTeamsById);
router.get("/invite/:inviteToken", getTeamByToken);
router.post("/invite/:inviteToken/join", protect, joinTeamByToken);
router.post("/invite/:teamId/invite-email", sendTeamInviteEmail);
router.post("/", protect, addTeam);
router.put("/:teamId", protect, updateTeam);
router.put("/:teamId/members/:memberId/role", protect, changeUserRole)
router.delete("/:teamId", protect, deleteTeam);
router.delete("/:teamId/members/:memberId", protect, removeUserFromTeam);

export default router