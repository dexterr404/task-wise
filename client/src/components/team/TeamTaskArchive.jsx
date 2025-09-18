import { useState } from "react";
import { colors } from "../../data/colors";
import { Unarchive, Delete } from "@mui/icons-material";
import { IconButton, Tooltip, Typography, Divider } from "@mui/material";
import { useTeamTasks } from "../../hooks/useTeamTasks";

import UnarchiveTaskModal from "../../features/task/UnarchiveTaskModal";
import DeleteTaskModal from "../../features/task/DeleteTaskModal";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePersonalTasks } from "../../hooks/usePersonalTasks";

function TeamTaskArchive({ tasks, columns, team }) {
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const isTeamsPage = pathname.includes("teams");

  let taskActions;

  if(isTeamsPage) {
    taskActions = useTeamTasks(team._id);
  } else {
    taskActions = usePersonalTasks(user.id);
  }

  const { onUnArchiveTask, onDeleteTask } = taskActions;
  

  const [unarchived, setUnarchived] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(false);

  // Collect all archived tasks across columns
    const archivedTasks = isTeamsPage
    ? Object.entries(columns || {}).flatMap(([_, t]) =>
        t.filter((task) => task.isArchived)
      )
    : tasks?.filter((task) => task.isArchived);

  return (
    <section className="flex flex-col w-full">
      {/* Header - hide on small screens */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-3 py-2 bg-gray-100 rounded-md">
        <div className="col-span-3 font-medium">Title</div>
        <div className="col-span-4 font-medium">Description</div>
        <div className="col-span-3 font-medium">Archived At</div>
        <div className="col-span-2 text-center font-medium">Actions</div>
      </div>

      <Divider sx={{ my: 1 }} />

      {archivedTasks.length === 0 ? (
        <div className="flex justify-center items-center py-6">
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            No archived tasks found.
          </Typography>
        </div>
      ) : (
        archivedTasks.map((task) => (
          <div
            key={task._id}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center px-3 py-3 shadow-sm rounded-md mb-3 bg-white cursor-pointer transition"
          >
            {/* Title */}
            <div className="md:col-span-3">
              <Typography sx={{ fontSize: 13 }}>
                {task.title}
              </Typography>
            </div>

            {/* Description */}
            <div className="md:col-span-4">
              <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                {task.description}
              </Typography>
            </div>

            {/* Archived At */}
            <div className="md:col-span-3">
              <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                {task.archivedAt
                  ? new Date(task.archivedAt).toLocaleString()
                  : "—"}
              </Typography>
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex md:justify-center">
                <Tooltip title="Unarchive">
                    <IconButton onClick={() => {setUnarchived(true); setSelectedTask(task)}} sx={{color: "gray", "&:hover": { color: colors.darkGreen }}}>
                        <Unarchive fontSize="small"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => {setDeleteTask(true); setSelectedTask(task)}} sx={{color: "gray", "&:hover": { color: colors.darkRed }}}>
                        <Delete fontSize="small"/>
                    </IconButton>
                </Tooltip>    
            </div>
          </div>
        ))
      )}
      <DeleteTaskModal open={deleteTask} onClose={() => setDeleteTask(false)} onDeleteTask={() => onDeleteTask({taskId:selectedTask._id})} />
      <UnarchiveTaskModal open={unarchived} onClose={() => setUnarchived(false)} onUnArchiveTask={() => onUnArchiveTask({taskId:selectedTask._id})}/>
    </section>
  );
}

export default TeamTaskArchive;
