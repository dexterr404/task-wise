import Team from "../models/Team.js"
import TeamTask from "../models/TeamTask.js"
import crypto from "crypto";
import User from "../models/User.js";

import { sendInviteEmail } from "../services/emailService.js";
import { inboxJoinUser, inboxKickUser, inboxLeftUser, inboxTeamInfoChange, inboxUserRoleChange } from "../services/teamService.js";
import { notificationTemplates } from "../utils/notificationTemplate.js";
import { notifyUser } from "../services/notificationService.js";


//Create new team
export const addTeam = async(req,res) => {
    try {
        const { name,description } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);

        const teams = await Team.find({
          $or: [
            { owner: userId },
            { "members.user": userId }
          ]
        });

        if(user?.subscription?.plan === "free" && teams.length >=3) {
          return res.status(403).json({ message: "Quota exceeded"});
        }
        const inviteToken = crypto.randomBytes(16).toString("hex");
        const newTeam = new Team({ name, description, owner: req.user._id,
            members: [{ user: req.user._id, role: "Leader", joinedAt: new Date() }],
            tasks: [], inviteToken });
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        console.log("Error in addTeam controller", error);
    }
}

//Get all the teams
export const getTeams = async(req,res) => {
    try {
        const userId = req.user._id;
        const teams = await Team.find({
            $or: [
                { owner: userId},
                { "members.user": userId}
            ]
        })
        .populate("owner", "name email profileImage")
        .populate("members.user", "name email profileImage");

        res.status(200).json(teams);
    } catch (error) {
        console.error("Error fetching teams", error);
        res.status(500).json({ message: "Internal server error"});
    }
}

//Get specicific team's data
export const getTeamsById = async(req,res) => {
    try {
        const userId = req.user._id;
        const { teamId } = req.params;

        const team = await Team.findOne({
            _id: teamId,
            $or: [
                { owner: userId },
                { "members.user": userId}
            ]
        })
        .populate("owner", "name email profileImage")
        .populate("members.user", "name email profileImage");

        if(!team) {
            return res.status(404).json({ message: "Team not found"});
        }

        res.status(200).json({team});
    } catch (error) {
        console.error("Error fetching team by id", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Delete team
export const deleteTeam = async(req,res) => {
    try {
        const {teamId} = req.params
        const userId = req.user._id;

        //Find the team first
        const team = await Team.findById(teamId);
        if(!team) return res.status(404).json({message: "Team not found"});

        //Only allow the owner to delete
        if(team.owner.toString() !== userId.toString()){
            return res.status(403).json({ message: "You are not allowed to delete this team" });
        }

         // Delete the team
        await team.deleteOne();
        res.status(200).json({ message: "Team deleted successfully" });
        
    } catch (error) {
        console.error("Error in deleteTeam controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Update team name and description
export const updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const userId = req.user._id;

    const { name, description } = req.body;

    // Get the current team first
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    const oldName = team.name;
    const oldDescription = team.description;

    // Apply updates
    if (name !== undefined) team.name = name;
    if (description !== undefined) team.description = description;

    const updatedTeam = await team.save();

    const user = await User.findById(userId);

    // Pass both old and new values
    await inboxTeamInfoChange(teamId, oldName, updatedTeam.name, oldDescription, updatedTeam.description, user);

    res.status(200).json({ updatedTeam });
  } catch (error) {
    console.error("Error in updateTeam controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//Get the team's info using the inviteToken
export const getTeamByToken = async(req,res) => {
    try {
        const {inviteToken} = req.params;
        const team = await Team.findOne({ inviteToken })
        .populate("owner", "name profileImage")
        .populate("members.user", "name profileImage");
        if(!team) return res.status(404).json({message: "Invalid invite link"});
        res.status(200).json({team});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.log("Error:",error.message);
    }
}

//Join the team using the inviteToken
export const joinTeamByToken = async (req, res) => {
  try {
    const { inviteToken } = req.params;
    const userId = req.user._id;

    const team = await Team.findOne({ inviteToken });
    if (!team) {
      return res.status(404).json({ message: "Invalid Link" });
    }

    // owner check
    if (team.owner.toString() === userId.toString()) {
      return res.status(200).json({ message: "You're already the owner", team });
    }

    // already a member check
    const isMember = team.members.find(m => m.user.toString() === userId.toString());
    if (isMember) {
      return res.status(200).json({ message: "Already a member", team });
    }

    // add new member
    team.members.push({ user: userId, role: "Member" });
    await team.save();

    const user = await User.findById(userId);

    await inboxJoinUser(team._id,user);

    return res.status(200).json({ message: "Joined team!", team });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Send a team email invitation
export const sendTeamInviteEmail = async(req,res) => {
    const { teamId } = req.params;
    const { email } = req.body;

    try {
        const team = await Team.findById(teamId);
        if(!team) return res.status(404).json({ message: "Team not found" });

        const inviteLink = `${process.env.APP_BASE_URL}/teams/invite/${team.inviteToken}`;

        await sendInviteEmail(email, inviteLink, team.name);

        return res.status(200).json({ message: "Invite sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to send invite email!" });
    }
}

//Remove user from a team
export const removeUserFromTeam = async(req,res) => {
    try {
        const { memberId, teamId } = req.params;
        const userId =  req.user._id;
        const member = await User.findById(memberId);
        
        const team = await Team.findById(teamId);
        if(!team) {
            return res.status(404).json({ message: "Team not found"});
        }

        //Prevent removing the owner
        if(team.owner.toString() === memberId){
            return res.status(400).json({ message: "Cannot remove the team owner"});
        }

        const updatedTeam = await Team.findByIdAndUpdate(
            teamId,
            { $pull: { members: { user: memberId } } },
            { new: true }
        )

        //Remove user from team tasks assigned to
        await TeamTask.updateMany(
            { team: teamId },
            { $pull: { assignedTo: memberId } }
        )

        const user = await User.findById(userId);

        if(userId.toString() !== memberId.toString()) {
          await inboxKickUser(teamId,user,member);
          await notifyUser(memberId,notificationTemplates.teamMemberRemoved(team,user));
        } else {
          await inboxLeftUser(teamId,member);
        }

        res.status(200).json({ 
            message: "User removed from the team",
            team: updatedTeam
        });
    } catch (error) {
        console.log("Error removing user from the team", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Change user role in the team
export const changeUserRole = async (req, res) => {
  try {
    const { teamId, memberId } = req.params;
    const { newRole } = req.body;
    const modifierId = req.user._id;
    const member = await User.findById(memberId);
    const user = await User.findById(modifierId);

    // Load team
    const team = await Team.findById(teamId).populate("members.user");
    if (!team) return res.status(404).json({ message: "Team not found" });

    // Find the modifier in team
    const modifier = team.members.find(
      (m) => m.user._id.toString() === modifierId.toString()
    );
    if (!modifier) {
      return res.status(403).json({ message: "You are not part of this team" });
    }

    // Only Leader can change roles
    if (modifier.role !== "Leader") {
      return res.status(403).json({ message: "Only the Leader can modify roles" });
    }

    // Find target member
    const targetIndex = team.members.findIndex(
      (m) => m.user._id.toString() === memberId.toString()
    );
    if (targetIndex === -1) {
      return res.status(404).json({ message: "Target user not found in team" });
    }

    const previousRole = team.members[targetIndex].role;

    // Prevent self-demotion if only one Leader exists
    if (modifier.user._id.toString() === memberId.toString() && newRole !== "Leader") {
      const otherLeader = team.members.find(
        (m, idx) => idx !== targetIndex && m.role === "Leader"
      );
      if (!otherLeader) {
        return res.status(400).json({ message: "Team must have a Leader" });
      }
    }

    // 5. Handle promotion to Leader
    if (newRole === "Leader") {
      // Demote current Leader (except the one being promoted)
      const currentLeaderIndex = team.members.findIndex((m) => m.role === "Leader");
      if (currentLeaderIndex !== -1 && currentLeaderIndex !== targetIndex) {
        team.members[currentLeaderIndex].role = "Admin";
      }
    }

    // 6. Apply role change
    team.members[targetIndex].role = newRole;
    
    await team.save();

    await inboxUserRoleChange(teamId,member,previousRole,newRole,user);
    await notifyUser(memberId,notificationTemplates.roleChanged(previousRole,newRole,team));

    res.status(200).json({
      message: "Role updated successfully",
      members: team.members,
    });
  } catch (error) {
    console.error("Error in changeUserRole controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};