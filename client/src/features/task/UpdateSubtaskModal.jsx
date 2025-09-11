import { useState, useEffect } from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography,} from "@mui/material";
import StatusMenu from "../../components/dropdownMenu/StatusMenu";
import { statusColors } from "../../data/status";
import toast from "react-hot-toast";
import { updateSubTask } from "../../api/taskService";
import { useSelector } from "react-redux";

function UpdateSubtaskModal({ open, onClose, task, fetchTask }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSubtaskIndex, setSelectedSubtaskIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // keep local editable copy of subtasks
  const [taskData, setTaskData] = useState({ subtasks: [] });

  const user = useSelector((state) => state.user);

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

    let mainStatus = "Not Started";

    if (subtaskStatuses.some(s => s === "Ongoing" || s === "Done")) {
      mainStatus = "Ongoing"
    } else{
      mainStatus = "Not Started"
    }

    return mainStatus
  }
 
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
      await updateSubTask(user.id,task._id,task,status,taskData.subtasks);
      
      toast.success("Subtasks updated successfully");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update subtasks");
    } finally {
      setIsLoading(false);
      fetchTask();
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
      <DialogTitle component="div">
        <Typography
          variant="subtitle1"
          sx={{ marginBottom: "2rem", fontSize: "1.2rem" }}
        >
          Update subtasks status here
        </Typography>
        <div className="flex flex-col justify-around text-sm gap-1 mt-3">
          {taskData.subtasks.map((t, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b-1 pb-1 border-b-gray-200"
            >
              <div className="flex items-center gap-1">
                <div className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                  {index + 1}
                </div>
                {t.title}
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
            </div>
          ))}
        </div>
      </DialogTitle>

      <DialogContent />

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
          sx={{ fontSize: "12px", backgroundColor: "#7CB342", "&:hover": { backgroundColor: "#9CCC65" }, textTransform: "none", marginRight: "14px" }}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateSubtaskModal;
