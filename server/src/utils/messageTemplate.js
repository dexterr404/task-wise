export const messageTemplates = {

  //Inbox task message template
  taskAdded: (taskTitle, authorName) => [
    `Task: <strong>${taskTitle}</strong> has been created by ${authorName}.`,
    `${authorName} created a new task <strong>${taskTitle}</strong>.`,
    `A new task <strong>${taskTitle}</strong> has been added to the team.`,
  ],

   taskStatusUpdated: (taskTitle, oldStatus, newStatus, authorName) => [
    `Task: <strong>${taskTitle}</strong> status changed from <strong>${oldStatus}</strong> to <strong>${newStatus}</strong> by ${authorName}.`,
    `${authorName} updated the task <strong>${taskTitle}</strong> from <strong>${oldStatus}</strong> to <strong>${newStatus}</strong>.`,
    `The task <strong>${taskTitle}</strong> is now <strong>${newStatus}</strong> (previously <strong>${oldStatus}</strong>).`,
  ],

  taskAssigned: (taskTitle, assigneeName, authorName) => [
    `Task: <strong>${taskTitle}</strong> has been assigned to <strong>${assigneeName}</strong> by ${authorName}.`,
    `${authorName} assigned the task <strong>${taskTitle}</strong> to <strong>${assigneeName}</strong>.`,
    `<strong>${assigneeName}</strong> is now responsible for task <strong>${taskTitle}</strong>.`,
  ],

  taskRemoved: (taskTitle, authorName) => [
    `Task: <strong>${taskTitle}</strong> has been removed by ${authorName}.`,
    `${authorName} removed the task <strong>${taskTitle}</strong>.`,
    `The task <strong>${taskTitle}</strong> was deleted from the team.`,
  ],

  subtaskUpdated: (parentTaskTitle, subtaskTitle, subtaskStatus, authorName) => [
    `Subtask: <strong>${subtaskTitle}</strong> of task <strong>${parentTaskTitle}</strong> was updated to <strong>${subtaskStatus}</strong> by ${authorName}.`,
    `${authorName} updated the subtask <strong>${subtaskTitle}</strong> under <strong>${parentTaskTitle}</strong> to <strong>${subtaskStatus}</strong>.`,
    `Changes were made to subtask <strong>${subtaskTitle}</strong> in task <strong>${parentTaskTitle}</strong>, now <strong>${subtaskStatus}</strong>.`,
  ],

  memberRemoved: (memberName, authorName) => [
    `<strong>${memberName}</strong> was removed from the team by ${authorName}.`,
    `${authorName} removed <strong>${memberName}</strong> from the team.`,
  ],

  taskArchived: (taskTitle, authorName) => [
    `Task: <strong>${taskTitle}</strong> has been archived by ${authorName}.`,
    `${authorName} archived the task <strong>${taskTitle}</strong>.`,
    `The task <strong>${taskTitle}</strong> is now archived.`
  ],

  taskUnarchived: (taskTitle, authorName) => [
    `Task: <strong>${taskTitle}</strong> has been unarchived by ${authorName}.`,
    `${authorName} restored the task <strong>${taskTitle}</strong>.`,
    `The task <strong>${taskTitle}</strong> is now active again.`,
  ],

  taskAssigned: (taskTitle, assigneeNames, authorName) => [
    `Task: <strong>${taskTitle}</strong> has been assigned to ${assigneeNames} by ${authorName}.`,
    `${authorName} assigned task <strong>${taskTitle}</strong> to ${assigneeNames}`,
    `The task <strong>${taskTitle}</strong> is now assigned to ${assigneeNames} by ${authorName}.`,
  ],

  // Inbox team members message template
  teamJoined: (authorName) => [
    `<strong>${authorName}</strong> joined the team`,
    `${authorName} has become a member of the team`,
    `Welcome <strong>${authorName}</strong> to the team!`
  ],

  teamKicked: (memberName, authorName) => [
    `<strong>${memberName}</strong> was removed from the team by ${authorName}`,
    `${authorName} kicked <strong>${memberName}</strong> from the team`,
    `<strong>${memberName}</strong> has been removed by ${authorName}`,
  ],

  teamLeft: (memberName) => [
    `<strong>${memberName}</strong> has left the team`,
    `${memberName} voluntarily left the team`,
    `${memberName} is no longer part of the team`,
  ],

  userRoleUpdated: (memberName, previousRole, newRole, authorName) => [
    `${authorName} changed ${memberName}'s role from <strong>${previousRole}</strong> to <strong>${newRole}</strong>`,
    `${memberName}'s role was updated from <strong>${previousRole}</strong> to <strong>${newRole}</strong> by ${authorName}`,
    `${authorName} updated ${memberName}'s role: <strong>${previousRole}</strong> → <strong>${newRole}</strong>`,
    `${memberName} is now a <strong>${newRole}</strong> (updated by ${authorName})`,
    `${authorName} promoted ${memberName} to <strong>${newRole}</strong>` // works best if it’s an upgrade
  ],

  //Inbox edit team template
  teamNameUpdated: (authorName, oldName, newName) => [
    `${authorName} changed the team name from "<strong>${oldName}</strong>" to "<strong>${newName}</strong>"`,
    `The team name was updated by ${authorName}: "<strong>${oldName}</strong>" → "<strong>${newName}</strong>"`,
    `${authorName} renamed the team to "<strong>${newName}</strong>"`,
  ],

  //Inbox team update template
  teamInfoUpdated: (authorName, oldName, newName, oldDesc, newDesc) => {
    const changes = [];

    if (oldName !== newName) {
      changes.push(`name from "<strong>${oldName}</strong>" to "<strong>${newName}</strong>"`);
    }

    if (oldDesc !== newDesc) {
      changes.push(`description`);
    }

    if (changes.length === 0) return [];

    return [
      `${authorName} updated the team ${changes.join(" and ")}`,
      `Team ${changes.join(" and ")} was updated by ${authorName}`,
      `${authorName} made changes to the team ${changes.join(" and ")}`,
    ];
  },

    
  system: (message) => [message],
};