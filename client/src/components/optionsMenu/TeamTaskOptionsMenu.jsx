import { useState } from "react";
import { Archive,Edit,Info } from "@mui/icons-material";
import { Tooltip,IconButton } from "@mui/material";
import { useTeamTasks } from "../../hooks/useTeamTasks";
import { colors } from "../../data/colors";

import EditTaskModal from "../../features/task/EditTaskModal";
import DetailsTaskModal from "../../features/task/DetailsTaskModal";
import ArchiveTaskModal from "../../features/task/ArchiveTaskModal";


export function TeamTaskOptionsMenu({task,team}) {
    const[editTask, setEditTask] = useState(false);
    const[detailsTask, setDetailsTask] = useState(false);
    const[archiveTask, setArchiveTask] = useState(false);

    const { onArchiveTask, onEditTask } = useTeamTasks(team._id);
   
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
      <ArchiveTaskModal open={archiveTask} onClose={() => setArchiveTask(false)} onArchiveTask={() => onArchiveTask({taskId:task._id})}/>
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
      <EditTaskModal open={editTask} onClose={() => setEditTask(false)} task={task} onUpdateTask={(updatedTask) =>
      onEditTask({ taskId: task._id, ...updatedTask })}/>
      
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