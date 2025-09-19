import { useState, useEffect } from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Divider,} from "@mui/material";
import { statusColors } from "../../data/status";
import { useLocation } from "react-router-dom";

import StatusMenu from "../../components/dropdownMenu/StatusMenu";
import { colors } from "../../data/colors";
import { Flag } from "@mui/icons-material";


function UpdateSubtaskModal({ open, onClose, task,onSubtaskUpdate }) {
  const { pathname } = useLocation();
  const isTeamsPage = pathname.includes("teams");

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSubtaskIndex, setSelectedSubtaskIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // keep local editable copy of subtasks
  const [taskData, setTaskData] = useState({ subtasks: [] });

  useEffect(() => {
    if (task) {
      setTaskData({
        ...task,
        subtasks: task.subtasks || [],
      });
    }
  }, [task]);

  const handleStatus = () => {
    const subtaskStatuses = taskData.subtasks.map(s => s.status);

    let mainStatus =(isTeamsPage ? "To Do" : "Not Started");

    if (
      subtaskStatuses.some(
        (s) => s === "Done" || s === (isTeamsPage ? "Doing" : "Ongoing")
      )
    ) {
      mainStatus = isTeamsPage ? "Doing" : "Ongoing";
    }

    return mainStatus;
  };
 
  const handleUpdateSubtaskStatus = (newStatus) => {
    if (selectedSubtaskIndex !== null) {
      const newSubtasks = [...taskData.subtasks];
      newSubtasks[selectedSubtaskIndex] = {
        ...newSubtasks[selectedSubtaskIndex],
        status: newStatus,
      };

      setTaskData((prev) => ({
        ...prev,
        subtasks: newSubtasks,
      }));

      setAnchorEl(null);
      setSelectedSubtaskIndex(null);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const status = handleStatus();
    try {
      const updatedTaskData = {
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                status: status,
                priority: task.priority,
                subtasks: taskData.subtasks,
            };
      await onSubtaskUpdate({taskId:task._id, updatedTask:updatedTaskData});
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, p: 1 },
      }}
    >
      <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
          <Flag fontSize="small"  sx={{ color: colors.darkerGreenYellow }}/> Update subtasks status here
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography sx={{ fontSize: 14 }}>
          {task.title}
        </Typography>
        <div className="flex flex-col justify-around text-sm gap-1 mt-3">
          <ul>
            {taskData.subtasks.length === 0 ? (
              <li className="text-sm text-gray-500 italic px-2 py-1 flex justify-center">
                No tasks available
              </li>
            ) : (
              taskData.subtasks.map((t, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b-2 pb-1 border-b-gray-200"
                >
                  <div className="flex items-center gap-2 text-xs px-2 py-1">
                    <span>{index + 1}.</span>
                    <span>{t.title}</span>
                  </div>

                  <div className="relative">
                    <div
                      className={`cursor-pointer px-2 text-white py-1 rounded-md text-xs hover:opacity-90 active:opacity-70
                        ${statusColors[t.status] || `bg-gray-700`}`}
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                        setSelectedSubtaskIndex(index);
                      }}
                    >
                      {t.status}
                    </div>

                    <StatusMenu
                      anchorEl={anchorEl}
                      onClose={() => {
                        setAnchorEl(null);
                        setSelectedSubtaskIndex(null);
                      }}
                      onSelect={(status) => handleUpdateSubtaskStatus(status)}
                    />
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          variant="contained"
          sx={{ fontSize: "12px", backgroundColor: colors.greenYellow, "&:hover": { backgroundColor: colors.darkerGreenYellow }, textTransform: "none", marginRight: "14px" }}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateSubtaskModal;
