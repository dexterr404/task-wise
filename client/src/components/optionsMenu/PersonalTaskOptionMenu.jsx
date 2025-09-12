import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Delete,Edit,Flag,Cancel,CheckCircle,ContentCopy, } from "@mui/icons-material";

import EditTaskModal from "../../features/task/EditTaskModal";
import DeleteTaskModal from "../../features/task/DeleteTaskModal";
import DoneTaskModal from "../../features/task/DoneTaskModal";
import NotDoneTaskModal from "../../features/task/NotDoneTaskModal";
import DuplicateTaskModal from "../../features/task/DuplicateTaskModal";
import UpdateSubtaskModal from "../../features/task/UpdateSubtaskModal";

export default function TodoOptionsMenu({task,closeOption,onDelete,onEdit,onSubtaskUpdate,onDoneTask,unDoneTask,onDuplicateTask}) {
  const[isEditTaskOpen,setIsEditTaskOpen] = useState(false);
  const[isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
  const[isDoneModalOpen,setIsDoneModalOpen] = useState(false);
  const[isNotDoneModalOpen,setIsNotDoneModalOpen] = useState(false);
  const[isDuplicateModalOpen,setIsDuplicateModalOpen] = useState(false);
  const[isSubtaskModalOpen,setIsSubtaskModalOpen] = useState(false);

  return <div className="absolute right-full lg:top-full shadow-md rounded-md px-1 bg-gray-200 flex gap-2">

    {/*Delete Task*/}
      <Tooltip title="Delete">
        <IconButton
          size="small"
          sx={{
            color: "gray",
            "&:hover": { color: "#b71c1c" }
          }}
          onClick={() => setIsDeleteModalOpen((prev) => !prev)}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>
      <DeleteTaskModal
        open={isDeleteModalOpen}
        onDelete={() => {onDelete(); closeOption();}}
        onClose={() => setIsDeleteModalOpen(false)}
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
       onEdit={(updatedData) => {
          onEdit(updatedData);
        }}
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
        onSubtaskUpdate={(taskId, updatedTask) => onSubtaskUpdate(taskId, updatedTask)}
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
      onDoneTask={(updatedTask) => onDoneTask(updatedTask)}
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
      unDoneTask={(updatedTask) => unDoneTask(updatedTask)}/>

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
