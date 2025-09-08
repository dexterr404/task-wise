import Team from "../models/Team.js"
import crypto from "crypto";
import { sendInviteEmail } from "../services/emailService.js";

//Create new team
export const addTeam = async(req,res) => {
    try {
        const { name,description } = req.body;
        const inviteToken = crypto.randomBytes(16).toString("hex");
        const newTeam = new Team({ name, description, owner: req.user._id, members: [], tasks: [], inviteToken });
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
        const { id } = req.params;

        const team = await Team.findOne({
            _id: id,
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
        const {id} = req.params
        const userId = req.user._id;

        //Find the team first
        const team = await Team.findById(id);
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
export const updateTeam = async(req,res) => {
    try {
        const {id} = req.params;
        const { name, description } = req.body;
        const updatedTeam = await Team.findByIdAndUpdate(
            { _id: id },
            {  name, description },
            { new: true}
        );
        if(!updatedTeam) return res.status(404).json({message: "Team not found"});

        res.status(200).json({updatedTeam});
    } catch (error) {
        console.error("Error in updateTeam controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

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
    team.members.push({ user: userId, role: "member" });
    await team.save();

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