import TeamInbox from "../models/TeamInbox.js";

export const getTeamInbox = async(req,res) => {
    try {
        const { teamId } = req.params;
        const { search } = req.query;
        let filterOption = { team: teamId };

        if(search) {
            const searchRegex = new RegExp(search, "i");
            filterOption.$or = [
                { description: searchRegex},
                { "author.name": searchRegex},
                { type: searchRegex}
            ]
        }

         // Fetch inbox entries for the team, sorted by newest first
        const inbox = await TeamInbox.find(filterOption)
        .sort({ createdAt: -1 })

        res.status(200).json(inbox);
    } catch (error) {
        console.log("Error fetching team inbox", error);
        res.status(500).json({ message: "Internal server error" });
    }
}