import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditTask from "./inputs/EditTaskForm";

export default function TodoOptionsMenu() {
  const[isEditOpen,setIsEditTaskOpen] = useState(false);

  return <div className="absolute right-full shadow-md rounded-md px-1 bg-gray-200 flex gap-2">
      <Tooltip title="Delete">
        <IconButton
          size="small"
          sx={{
            color: "gray",
            "&:hover": { color: "red" }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>

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

      <Tooltip title="Mark as Done">
        <IconButton 
        sx={{
          color: "gray",
          "&:hover": { color: "green" }
        }}
        size="small">
          <CheckCircleIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Duplicate">
        <IconButton 
        sx={{
          color: "gray",
          "&:hover": { color: "blue" }
        }}
        size="small">
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
}
