import { pushInboxNotification } from "./teamInboxService.js";
import { messageTemplates } from "../utils/messageTemplate.js";


export const notifyTaskUpdates = async (task, previousStatus, user) => {

  //Push inbox in status change
  if (task.status !== previousStatus) {
    const variants = messageTemplates.taskStatusUpdated(task.title, previousStatus, task.status, user.name);
    const description = variants[Math.floor(Math.random() * variants.length)];
    await pushInboxNotification(task.team, "Task status update", description, { user: user._id, name: user.name, profileImage: user.profileImage }, "task");
  }

}

//Push inbox in task delete
export const notifyTaskDeletes = async (task, user) => {

    const variants = messageTemplates.taskRemoved(task.title, user.name);
    const description = variants[Math.floor(Math.random() * variants.length)]

    await pushInboxNotification(task.team,"Task deleted",description,{user : user._id, name: user.name, profileImage: user.profileImage} , "task");
}

//Push inbox in task addition
export const notifyTaskAdd = async (task, user) => {

    const variants = messageTemplates.taskAdded(task.title, user.name);
    const desc = variants[Math.floor(Math.random() * variants.length)];

    await pushInboxNotification(task.team,"Task added",desc,{user : user._id, name: user.name, profileImage: user.profileImage} , "task");
}

//Push inbox in task archive
export const notifyTaskArchive = async(task, user) => {

    const variants = messageTemplates.taskArchived(task.title, user.name.split(" ")[0]);
    const desc = variants[Math.floor(Math.random() * variants.length)];

    await pushInboxNotification(task.team,"Task archived",desc,{user : user._id, name: user.name, profileImage: user.profileImage} , "task");
}

//Push inbox in task unarchive
export const notifyTaskUnarchive = async(task, user) => {

    const variants = messageTemplates.taskUnarchived(task.title, user.name.split(" ")[0]);
    const desc = variants[Math.floor(Math.random() * variants.length)];

    await pushInboxNotification(task.team,"Task unarchived",desc,{user : user._id, name: user.name, profileImage: user.profileImage} , "task");
}

//Push inbox in subtask update
export const notifySubtaskUpdate = async(task,subtaskTitle,subtaskStatus,user) => {

    const variants = messageTemplates.subtaskUpdated(task.title,subtaskTitle,subtaskStatus,user.name.split(" ")[0]);
    const desc = variants[Math.floor(Math.random() * variants.length)];

    await pushInboxNotification(task.team,"Task subtask update",desc,{user : user._id, name: user.name, profileImage: user.profileImage} , "task");
}

//Push inbox for task assignment
export const notifyTaskAssignment = async (task, user) => {
    if (!task.assignedTo || task.assignedTo.length === 0) return;

    // Make sure assignedTo is populated with name
    const assigneeNames = task.assignedTo.map(u => u.name.split(" ")[0]).join(", ");

    const variants = messageTemplates.taskAssigned(task.title, assigneeNames, user.name.split(" ")[0]);
    const description = variants[Math.floor(Math.random() * variants.length)];

    await pushInboxNotification(
        task.team,
        "Task assignment",
        description,
        { user: user._id, name: user.name, profileImage: user.profileImage },
        "task"
    );
};
