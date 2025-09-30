import {Table, TableBody, TableCell, TableContainer,TableHead, TableRow,
Paper, IconButton, Tooltip, Typography,
TableFooter} from "@mui/material";
import { Edit, Archive } from "@mui/icons-material";
import { useState } from "react";
import { useTeamTasks } from "../../hooks/useTeamTasks";
import { colors } from "../../data/colors";

import ArchiveTaskModal from "../../features/task/ArchiveTaskModal";
import EditTask from "../../features/task/EditTaskModal";

function TeamTaskTable({ tasks, team }) {
  const { onArchiveTask, onUpdateTask } = useTeamTasks(team._id);

  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState(false);
  const [archiveTask, setArchiveTask] = useState(false);

  // Just filter active tasks directly
  const activeTasks = tasks.filter((task) => !task.isArchived);

  return (
    <section className="w-full h-full">
      {activeTasks.length === 0 ? (
        <Typography sx={{ color: "var(--color-text-primary)", fontSize: 14, textAlign: "center", py: 4 }}>
          No active tasks found.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table size="small">
            {/* Header */}
            <TableHead
            sx={{
              backgroundColor: "var(--color-surface)",
            }}
            >
              <TableRow sx={{ backgroundColor: "var(--color-surface)"}}>
                <TableCell sx={{ fontWeight: 600, color: "var(--color-text-primary)"}}><Typography variant="body2">Title</Typography></TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--color-text-primary)" }}><Typography variant="body2">Description</Typography></TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--color-text-primary)" }}><Typography variant="body2">Column</Typography></TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--color-text-primary)" }}><Typography variant="body2">Priority</Typography></TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--color-text-primary)" }}><Typography variant="body2">Deadline</Typography></TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--color-text-primary)", textAlign: "center" }}><Typography variant="body2">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            {/* Body */}
            <TableBody>
              {activeTasks.map((task) => (
                <TableRow key={task._id} sx={{ backgroundColor: "var(--color-surface)" }}
                >
                  <TableCell>
                    <Typography sx={{ color: "var(--color-text-primary)", fontSize: 13 }}>
                        {task.title}
                    </Typography>
                    </TableCell>
                  <TableCell>
                    <Typography sx={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
                      {task.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
                        {task.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
                        {task.priority}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
                        {task.deadline ? new Date(task.deadline).toLocaleDateString() : "—"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => {setEditTask(true); setSelectedTask(task);}}>
                        <Edit fontSize="small" sx={{color: "var(--color-text-secondary)", "&:hover": { color: colors.darkerblue }}}/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Archive">
                      <IconButton onClick={() => {setArchiveTask(true); setSelectedTask(task);}}>
                        <Archive fontSize="small" sx={{color: "var(--color-text-secondary)", "&:hover": { color: colors.darkOrange }}}/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <ArchiveTaskModal open={archiveTask} onClose={() => setArchiveTask(false)} onArchiveTask={() => onArchiveTask({ taskId:selectedTask._id })}/>
            <EditTask open={editTask} onClose={() => setEditTask(false)} task={selectedTask} onUpdateTask={(updatedTask) =>
            onUpdateTask({ taskId: selectedTask._id, ...updatedTask })}/>
          </Table>
        </TableContainer>
      )}
    </section>
  );
}

export default TeamTaskTable;