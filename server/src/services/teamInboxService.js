import TeamInbox from "../models/TeamInbox.js";

export const pushInboxNotification = async(teamId, title, message, author, type ) => {
    try {
        const inboxEntry = await TeamInbox.create({
            team: teamId,
            title,
            description:message,
            author: {
                user: author._id,
                name: author.name,
                profileImage: author.profileImage
            },
            type
        });
        return inboxEntry;
    } catch (error) {
        console.log("Error pushing inbox notifications", error);
    }
}