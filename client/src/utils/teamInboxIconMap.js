import { CheckCircle, Archive, Delete, PersonAdd, RemoveCircle, Info, Unarchive, AddTask, Flag, QuestionMark, AssignmentInd, Celebration, MeetingRoom, ManageAccounts, People } from "@mui/icons-material";

export const teamInboxIconMap = {
  "Task added": AddTask,
  "Task done": CheckCircle,
  "Task archived": Archive,
  "Task status update": QuestionMark,
  "Task subtask update": Flag,
  "Task assignment": AssignmentInd,
  "Task unarchived": Unarchive,
  "Task deleted": Delete,
  "Member added": PersonAdd,
  "Member left": MeetingRoom,
  "Member kicked": RemoveCircle,
  "New member": Celebration,
  "Change role": ManageAccounts,
  "Team info change": People,
  system: Info,
};

export const teamInboxIconColorMap = {
  "Task added": "text-blue-500",
  "Task done": "text-green-600",
  "Task archived": "text-gray-500",
  "Task status update": "text-yellow-500",
  "Task subtask update": "text-teal-500",
  "Task assignment": "text-indigo-600",
  "Task unarchived": "text-green-500",
  "Task deleted": "text-red-600",
  "Member added": "text-green-500",
  "Member left": "text-orange-500",
  "Member kicked": "text-red-500",
  "New member": "text-purple-500",
  "Change role": "text-cyan-600",
  "Team info change": "text-blue-700",
  system: "text-gray-400",
};
