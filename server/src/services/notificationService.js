import Notification from "../models/Notification.js";
import { normalizeUserId } from "../utils/normalizeUserId.js";
import { notificationTemplates } from "../utils/notificationTemplate.js";

export const notifyUser = async (userOrId, payload) => {
  const userId = normalizeUserId(userOrId);

  const { user, ...rest } = payload;
  return await Notification.create({ user: userId, ...rest });
};

export const notifyUsers = async (usersId, payload) => {
  const docs = usersId.map(userId => ({ user: normalizeUserId(userId), ...payload }));
  return await Notification.insertMany(docs);
};


export const notifyTeamMembers = async (team,payload,task) => {

  const notifications = team.members
  .filter(member => member && member.user.toString() !== task.createdBy.toString())
  .map(member => notifyUser(member.user,payload)
  );

  return await Promise.all(notifications);
};

export const notifyTaskCreation = async (team, task) => {
  const payload = notificationTemplates.taskCreated(task, team);

  return await notifyTeamMembers(team, payload, task);
};

export const notifyUsersAssignment = async (task, team, actor, usersId) => {
  const payload = notificationTemplates.taskAssigned(task, team, actor);

  return await notifyUsers(usersId, payload);
};

export const notifyUsersUnassignment = async (task, team, actor, usersId) => {
  const payload = notificationTemplates.taskUnassigned(task, team, actor);

  return await notifyUsers(usersId, payload);
};

export const notifyTaskStatusUpdate = async (task, previousStatus, team, actor) => {
  // Skip if no real status change
  if (task.status === previousStatus) return;

  const payload = notificationTemplates.taskStatusChanged(task, previousStatus, team, actor);

  // Notify only assigned users, excluding the actor
  const recipients = task.assignedTo
    .map(u => normalizeUserId(u))
    .filter(userId => userId !== normalizeUserId(actor._id));

  if (recipients.length === 0) return;

  return await notifyUsers(recipients, payload);
};

export const notifyTaskComments = async (task, team, actor) => {
  const payload = notificationTemplates.taskCommented(task, team, actor);

  // Notify only assigned users, excluding the actor
  const recipients = task.assignedTo
    .map(u => normalizeUserId(u))
    .filter(userId => userId !== normalizeUserId(actor._id));

  if (recipients.length === 0) return;

  return await notifyUsers(recipients, payload);
};