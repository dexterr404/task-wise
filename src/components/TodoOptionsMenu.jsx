import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditTask from "./inputs/EditTaskForm";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import DoneTaskModal from "./modals/DoneTaskModal";
import DuplicateTaskModal from "./modals/DuplicateTaskModal";
import UpdateSubtaskModal from "./modals/UpdateSubtaskModal";

export default function TodoOptionsMenu({task}) {
  const[isEditOpen,setIsEditTaskOpen] = useState(false);
  const[isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
  const[isDoneModalOpen,setIsDoneModalOpen] = useState(false);
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
        open={isDeleteModalOpen}
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
      {
        isEditOpen && <EditTask onClose={() => setIsEditTaskOpen(false)}/>
      }
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
      open={isDoneModalOpen}
      onClose={() => setIsDoneModalOpen(false)} />

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
      open={isDuplicateModalOpen}
      onClose={() => setIsDuplicateModalOpen(false)}/>
    </div>
}
