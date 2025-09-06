import Team from "../models/Team.js"

export const addTeam = async(req,res) => {
    try {
        const { name,description } = req.body;
        const newTeam = new Team({ name, description, owner: req.user._id, members: [], tasks: [] });
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
        console.log("Error in addTeam controller", error);
    }
}

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

export const deleteTeam = async(req,res) => {
    try {
        const {id} = req.params
        const team = await Team.findOneAndDelete({_id: id});
        if(!team) return res.status(404).json({message: "Team not found"});
        res.status(200).json({message: "Team deleted successfully"});
    } catch (error) {
        console.error("Error in deleteTeam controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

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