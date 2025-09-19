import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Delete,Edit,Flag,Cancel,CheckCircle,ContentCopy,Archive } from "@mui/icons-material";
import { usePersonalTasks } from "../../hooks/usePersonalTasks";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTeamTasks } from "../../hooks/useTeamTasks";
import { colors } from "../../data/colors";

import EditTaskModal from "../../features/task/EditTaskModal";
import DoneTaskModal from "../../features/task/DoneTaskModal";
import NotDoneTaskModal from "../../features/task/NotDoneTaskModal";
import DuplicateTaskModal from "../../features/task/DuplicateTaskModal";
import UpdateSubtaskModal from "../../features/task/UpdateSubtaskModal";
import ArchiveTaskModal from "../../features/task/ArchiveTaskModal";

export default function TodoOptionsMenu({task,team}) {
  const { pathname } = useLocation()
  const user = useSelector((state) => state.user);

  const isTeamPage = pathname.includes("teams");

  let taskActions

  if (isTeamPage) {
    taskActions = useTeamTasks(team._id)
  } else {
    taskActions = usePersonalTasks(user.id)
  }
  
  const { onDoneTask, onUndoneTask, onDuplicateTask, onSubtaskUpdate, onEditTask, onArchiveTask } = taskActions

  const[isEditTaskOpen,setIsEditTaskOpen] = useState(false);
  const[isDoneModalOpen,setIsDoneModalOpen] = useState(false);
  const[isNotDoneModalOpen,setIsNotDoneModalOpen] = useState(false);
  const[isDuplicateModalOpen,setIsDuplicateModalOpen] = useState(false);
  const[isSubtaskModalOpen,setIsSubtaskModalOpen] = useState(false);
  const[isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  return <div className="absolute right-full lg:top-full shadow-md rounded-md px-1 bg-gray-200 flex gap-2">
      {/*Archive Task*/}
      <Tooltip title="Archive">
        <IconButton
          onClick={() => setIsArchiveModalOpen(true)}
          size="small"
          sx={{
            color: "gray",
            "&:hover": { color: colors.darkOrange }
          }}
        >
          <Archive fontSize="small" />
        </IconButton>
      </Tooltip>
      <ArchiveTaskModal 
      open={isArchiveModalOpen}
      onClose={() => setIsArchiveModalOpen(false)}
      onArchiveTask={() => onArchiveTask({taskId:task._id})}
      />
      {/*Edit Task*/}
      <Tooltip title="Edit">
        <IconButton
        sx={{
          color: "gray",
          "&:hover": { color: "#e68900" }
        }} 
        size="small" onClick={() => {setIsEditTaskOpen((prev) => !prev)}}>
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>
      <EditTaskModal task={task}
       open={isEditTaskOpen}
       onClose={() => {setIsEditTaskOpen(false)}}
       onUpdateTask={(updatedTask) => onEditTask({taskId:task._id,...updatedTask})}
       />
      {/*Update Subtask*/}
      <Tooltip title="Update Subtask">
        <IconButton
          sx={{
            color: "gray",
            "&:hover": { color: "#7CB342" }
          }}
          onClick={() => setIsSubtaskModalOpen(true)}
          size="small"
        >
          <Flag fontSize="small" />
        </IconButton>
      </Tooltip>
      <UpdateSubtaskModal
        open={isSubtaskModalOpen}
        task={task}
        onClose={() => setIsSubtaskModalOpen(false)}
        onSubtaskUpdate={onSubtaskUpdate}
      />

      {/*Update task status to done*/}
      <Tooltip title="Mark as Done">
        <IconButton 
          sx={{
            color: "gray",
            "&:hover": { color: "#2E7D32" }
          }}
          onClick={() => {setIsDoneModalOpen((prev) => !prev)}}
          size="small">
          <CheckCircle fontSize="small" />
        </IconButton>
      </Tooltip>
      <DoneTaskModal
      task={task}
      open={isDoneModalOpen}
      onClose={() => setIsDoneModalOpen(false)}
      onDoneTask={(updatedTask) => onDoneTask({taskId:task._id,updatedTask})}
       />

      {/*Update task status to ongoing*/}
      <Tooltip title="Undone">
        <IconButton 
        sx={{
          color: "gray",
          "&:hover": { color: "#d4af0d" }
        }}
        onClick={() => {setIsNotDoneModalOpen((prev) => !prev)}}
        size="small">
          <Cancel fontSize="small" />
        </IconButton>
      </Tooltip>
      <NotDoneTaskModal 
      task={task}
      open={isNotDoneModalOpen}
      onClose={() => setIsNotDoneModalOpen(false)}
      onUndoneTask={(updatedTask) => onUndoneTask({taskId:task._id,updatedTask})}/>

      {/*Duplicate Task*/}
      <Tooltip title="Duplicate">
        <IconButton 
        sx={{
          color: "gray",
          "&:hover": { color: "#1976D2" }
        }}
        onClick={() => setIsDuplicateModalOpen((prev) => !prev)}
        size="small">
          <ContentCopy fontSize="small" />
        </IconButton>
      </Tooltip>
      <DuplicateTaskModal 
      task={task}
      open={isDuplicateModalOpen}
      onClose={() => setIsDuplicateModalOpen(false)}
      onDuplicateTask={(newTask) => onDuplicateTask(newTask)}
      />
    </div>
}
