import { useState } from "react";
import { Delete,Edit,Info } from "@mui/icons-material";
import { Tooltip,IconButton } from "@mui/material";

import DeleteTaskModal from "../../features/task/DeleteTaskModal";
import EditTaskModal from "../../features/task/EditTaskModal";

export function TeamTaskOptionsMenu({handleDelete,handleEdit,task,closeMenu}) {
    const[deleteTask, setDeleteTask] = useState(false);
    const[editTask, setEditTask] = useState(false);
   
    return <div className="absolute right-full lg:top-full shadow-md rounded-md px-1 bg-gray-200 flex gap-2">
    {/*Delete Task*/}
      <Tooltip title="Delete">
        <IconButton
          onClick={() => setDeleteTask(true)}
          size="small"
          sx={{
            color: "gray",
            "&:hover": { color: "#b71c1c" }
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>
      <DeleteTaskModal open={deleteTask} onClose={() => setDeleteTask(false)} onDelete={handleDelete}
      />
      {/*Edit Task*/}
      <Tooltip title="Edit">
        <IconButton
        onClick={() => setEditTask(true)}
        sx={{
          color: "gray",
          "&:hover": { color: "#e68900" }
        }} 
        size="small">
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>
      <EditTaskModal open={editTask} onClose={() => {setEditTask(false)}} task={task} onEdit={handleEdit} closeMenu={closeMenu}/>
      
      {/*Update Subtask*/}
      <Tooltip title="Info">
        <IconButton
          sx={{
            color: "gray",
            "&:hover": { color: "#7CB342" }
          }}
          size="small"
        >
          <Info fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
}

export default TeamTaskOptionsMenu