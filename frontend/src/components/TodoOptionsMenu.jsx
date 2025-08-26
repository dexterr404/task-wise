import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditTask from "../features/task/editTask/EditTaskForm";
import DeleteTaskModal from "../features/task/deleteTask/DeleteTaskModal";
import DoneTaskModal from "../features/task/updateTask/DoneTaskModal";
import NotDoneTaskModal from "../features/task/unDoneTask/NotDoneTaskModal";
import DuplicateTaskModal from "../features/task/duplicateTask/DuplicateTaskModal";
import UpdateSubtaskModal from "../features/task/updateSubtask/UpdateSubtaskModal";

export default function TodoOptionsMenu({task,closeOption,fetchTask}) {
  const[isEditTaskOpen,setIsEditTaskOpen] = useState(false);
  const[isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
  const[isDoneModalOpen,setIsDoneModalOpen] = useState(false);
  const[isNotDoneModalOpen,setIsNotDoneModalOpen] = useState(false);
  const[isDuplicateModalOpen,setIsDuplicateModalOpen] = useState(false);
  const[isSubtaskModalOpen,setIsSubtaskModalOpen] = useState(false);

  return <div className="absolute right-full lg:top-full shadow-md rounded-md px-1 bg-gray-200 flex gap-2">
      <Tooltip title="Delete">
        <IconButton
          size="small"
          sx={{
            color: "gray",
            "&:hover": { color: "red" }
          }}
          onClick={() => setIsDeleteModalOpen((prev) => !prev)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <DeleteTaskModal
        taskId={task._id}
        fetchTask={() => fetchTask()}
        open={isDeleteModalOpen}
        onDelete={() => {
          setIsDeleteModalOpen(false);
          closeOption();
          fetchTask();
        }}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <Tooltip title="Edit">
        <IconButton
        sx={{
          color: "gray",
          "&:hover": { color: "orange" }
        }} 
        size="small" onClick={() => {setIsEditTaskOpen((prev) => !prev)}}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <EditTask task={task} open={isEditTaskOpen} onClose={() => {setIsEditTaskOpen(false)}} fetchTask={() => fetchTask()}/>
      <Tooltip title="Update Subtask">
        <IconButton
          sx={{
            color: "gray",
            "&:hover": { color: "yellowgreen" }
          }}
          onClick={() => setIsSubtaskModalOpen(true)}
          size="small"
        >
          <FlagIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <UpdateSubtaskModal
        open={isSubtaskModalOpen}
        fetchTask={fetchTask}
        task={task}
        onClose={() => setIsSubtaskModalOpen(false)}
      />
      <Tooltip title="Mark as Done">
        <IconButton 
        sx={{
          color: "gray",
          "&:hover": { color: "green" }
        }}
        onClick={() => {setIsDoneModalOpen((prev) => !prev)}}
        size="small">
          <CheckCircleIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <DoneTaskModal
      task={task}
      fetchTask={() => fetchTask()}
      open={isDoneModalOpen}
      onClose={() => setIsDoneModalOpen(false)} />
      <Tooltip title="Undone">
        <IconButton 
        sx={{
          color: "gray",
          "&:hover": { color: "#f1c915" }
        }}
        onClick={() => {setIsNotDoneModalOpen((prev) => !prev)}}
        size="small">
          <CancelIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <NotDoneTaskModal 
      task={task}
      open={isNotDoneModalOpen}
      fetchTask={() => fetchTask()}
      onClose={() => setIsNotDoneModalOpen(false)}/>
      <Tooltip title="Duplicate">
        <IconButton 
        sx={{
          color: "gray",
          "&:hover": { color: "blue" }
        }}
        onClick={() => setIsDuplicateModalOpen((prev) => !prev)}
        size="small">
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <DuplicateTaskModal 
      task={task}
      open={isDuplicateModalOpen}
      fetchTask={() => fetchTask()}
      onClose={() => setIsDuplicateModalOpen(false)}/>
    </div>
}
