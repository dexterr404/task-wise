import Team from "../models/Team.js"

export const addTeam = async(req,res) => {
    try {
        const { name,description } = req.body;
        const newTeam = new Team({ name, description, owner: req.user._id, members: [], tasks: [] });
        await newTeam.save();
        res.status(200).json({ message: "Team created succesfully"});
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