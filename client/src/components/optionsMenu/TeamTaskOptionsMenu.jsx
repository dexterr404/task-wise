import { useState } from "react";
import { Archive, Delete,Details,Edit,Info } from "@mui/icons-material";
import { Tooltip,IconButton } from "@mui/material";

import DeleteTaskModal from "../../features/task/DeleteTaskModal";
import EditTaskModal from "../../features/task/EditTaskModal";
import DetailsTaskModal from "../../features/task/DetailsTaskModal";
import ArchiveTaskModal from "../../features/task/ArchiveTaskModal";
import { colors } from "../../data/colors";

export function TeamTaskOptionsMenu({handleDelete,handleEdit,handleArchive,task,team}) {
    const[deleteTask, setDeleteTask] = useState(false);
    const[editTask, setEditTask] = useState(false);
    const[detailsTask, setDetailsTask] = useState(false);
    const[archiveTask, setArchiveTask] = useState(false);
   
    return <div className="absolute right-full lg:top-full shadow-md rounded-md px-1 bg-gray-200 flex gap-2">
      {/*Archive Task*/}
      <Tooltip title="Archive">
        <IconButton
          onClick={() => setArchiveTask(true)}
          size="small"
          sx={{
            color: "gray",
            "&:hover": { color: colors.darkOrange }
          }}
        >
          <Archive fontSize="small" />
        </IconButton>
      </Tooltip>
      <ArchiveTaskModal open={archiveTask} onClose={() => setArchiveTask(false)} onArchive={handleArchive}/>
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
      <EditTaskModal open={editTask} onClose={() => {setEditTask(false)}} task={task} onEdit={handleEdit}/>
      
      {/*Update Subtask*/}
      <Tooltip title="Info">
        <IconButton
        onClick={() => setDetailsTask(true)}
          sx={{
            color: "gray",
            "&:hover": { color: "#7CB342" }
          }}
          size="small"
        >
          <Info fontSize="small" />
        </IconButton>
      </Tooltip>
      <DetailsTaskModal open={detailsTask} onClose={() => setDetailsTask(false)} task={task} team={team}/>
    </div>
}

export default TeamTaskOptionsMenu