export const notificationTemplates = {
  taskCreated: (task, team) => ({
    title: task.title,
    description: `Task "${task.title}" has been added to team ${team.name}.`,
    type: "task",
  }),
  roleChanged: (previousRole, newRole, team) => ({
    title: "Role Updated",
    description: `Your role in team ${team.name} has been changed from ${previousRole} to ${newRole}.`,
    type: "team",
  }),
  taskAssigned: (task, team, assignedBy) => ({
    title: "Task Assigned",
    description: `You have been assigned to task "${task.title}" in team ${team.name} by ${assignedBy.name}.`,
    type: "task",
  }),
  taskUnassigned: (task, team, unassignedBy) => ({
    title: "Task Unassigned",
    description: `You have been unassigned from task "${task.title}" in team ${team.name} by ${unassignedBy.name}.`,
    type: "task",
  }),
  teamMemberRemoved: (team, removedBy) => ({
    title: "Removed from Team",
    description: `You have been removed from the team "${team.name}" by ${removedBy.name}.`,
    type: "team",
  }),
  taskStatusChanged: (task, previousStatus, team, changedBy) => ({
    title: "Task Status Updated",
    description: `The task "${task.title}" in team ${team.name} was moved from "${previousStatus}" to "${task.status}" by ${changedBy.name}.`,
    type: "task",
  }),
  taskCommented: (task, team, commentedBy) => ({
    title: "New Comment on Task",
    description: `${commentedBy.name} commented on the task "${task.title}" in team ${team.name}.`,
    type: "task",
  }),
}