import { messageTemplates } from "../utils/messageTemplate.js";
import { pushInboxNotification } from "./teamInboxService.js";

//Push inbox in user join
export const notifyJoinUser = async(teamId,user) => {

    const variants = messageTemplates.teamJoined(user.name.split(" ")[0]);
    const desc = variants[Math.floor(Math.random() * variants.length)];

    await pushInboxNotification(teamId,"New member",desc,{user : user._id, name: user.name, profileImage: user.profileImage} , "member");
}

//Push inbox in user remove
export const notifyKickUser = async(teamId,user,member) => {

    const variants = messageTemplates.teamKicked(member.name.split(" ")[0],user.name.split(" ")[0]);
    const desc = variants[Math.floor(Math.random() * variants.length)];

     await pushInboxNotification(teamId,"Kick member",desc,{user : user._id, name: user.name, profileImage: user.profileImage} , "member");
}

//Push inbox in user left
export const notifyLeftUser = async(teamId,member) => {

    const variants = messageTemplates.teamLeft(member.name.split(" ")[0]);
    const desc = variants[Math.floor(Math.random() * variants.length)];

    await pushInboxNotification(teamId,"Member left",desc,{user : member._id, name: member.name, profileImage: member.profileImage} , "member");
}

//Push inbox in user role change
export const notifyUserRoleChange = async(teamId,member,previousRole,newRole,user) => {

    const variants = messageTemplates.userRoleUpdated(member.name.split(" ")[0],previousRole,newRole,user.name.split(" ")[0]);
    const desc = variants[Math.floor(Math.random() * variants.length)];

    await pushInboxNotification(teamId,"Change role",desc,{user : user._id, name: user.name, profileImage: user.profileImage} , "member");
}

//Push inbox in team title change
export const notifyTeamInfoChange = async(teamId,oldTitle,newTitle,oldDesc,newDesc,user) => {

    const variants = messageTemplates.teamInfoUpdated(user.name.split(" ")[0],oldTitle,newTitle,oldDesc,newDesc);
    const desc = variants[Math.floor(Math.random() * variants.length)];

    await pushInboxNotification(teamId,"Team info change",desc,{user : user._id, name: user.name, profileImage: user.profileImage} , "team");
}