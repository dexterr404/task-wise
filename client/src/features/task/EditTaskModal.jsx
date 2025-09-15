import { useState, useEffect } from "react";
import {Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,MenuItem,IconButton} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";


const priorities = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export default function EditTask({task,open,onClose,onEdit }) {
  const [isLoading, setIsLoading] = useState(false);

  const [taskData, setTaskData] = useState(() => ({
    title: task?.title || "",
    description: task?.description || "",
    deadline: task?.deadline || "",
    priority: task?.priority || "",
    subtasks: task?.subtasks || [],
  }));

  //Reset state when task changes
  useEffect(() => {
    if (task) {
      setTaskData({
        title: task.title || "",
        description: task.description || "",
        deadline: task.deadline || "",
        priority: task.priority,
        subtasks: task.subtasks || [],
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...taskData.subtasks];
    newSubtasks[index].title = value;
    setTaskData({ ...taskData, subtasks: newSubtasks });
  };

  const handleDeadlineChange = (value) => {
    setTaskData({ ...taskData, deadline: value });
  };

  const handleAddSubtask = () => {
    setTaskData({
      ...taskData,
      subtasks: [...taskData.subtasks, { title: "", status: "Not Started" }],
    });
  };

  const handleRemoveSubtask = (index) => {
    const newSubtasks = taskData.subtasks.filter((_, i) => i !== index);
    setTaskData({ ...taskData, subtasks: newSubtasks });
  };

  const handleSave = async() => {
    const {title,description,deadline,priority,subtasks,status} = taskData;

    if(!title.trim() || 
    !description.trim() || 
    !deadline.trim() || 
    !priority.trim()
    ) {
      toast.error("Fill all the required fields!");
      return
    }

    //Clean and remove blanked subtasks
    const validSubtasks = subtasks
    .filter( sub => sub.title && sub.title.trim() !== "")
    .map( sub => ({...sub, title: sub.title.trim()}));

    setIsLoading(true);
    try {
        await onEdit({title,description,deadline,priority,subtasks:validSubtasks,status});
        toast.success("Task edited successfully");
        onClose();
      } catch (error) {
        console.error("Error editing task:", error.message);
        toast.error("Failed to edit task");
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 2, p: 1 },
      }}
       disableEnforceFocus={false} onClose={onClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="*Task Name"
            name="title"
            InputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
            margin="dense"
            value={taskData.title}
            onChange={handleChange}
          />
          <TextField
            label="*Description"
            name="description"
            InputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
            margin="dense"
            multiline
            rows={3}
            value={taskData.description}
            onChange={handleChange}
          />
          <TextField
            label="*Due Date"
            name="deadline"
            type="date"
            InputProps={
            { min: new Date().toISOString().split("T")[0], 
            style: { fontSize: 14 } 
            }}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={taskData.deadline.split("T")[0] }
            onChange={(e) => handleDeadlineChange(e.target.value)}
          />
          <TextField
            label="*Priority"
            name="priority"
            InputProps={{
              style: { fontSize: 14 },
            }}
            select
            fullWidth
            margin="dense"
            value={taskData.priority}
            onChange={handleChange}
          >
            {priorities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Subtasks */}
          {taskData.subtasks.map((subtask, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 8,
              }}
            >
              <TextField
                  label={`Subtask ${index + 1}`}
                  InputProps={{
                style: { fontSize: 14 },
              }}
                fullWidth
                value={subtask.title}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
              />
              <IconButton color="error" onClick={() => handleRemoveSubtask(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button size="small" onClick={handleAddSubtask} sx={{ mt: 1 }} style={ {fontWeight: "bold"} }>
            + Add Subtask
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} 
            sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isLoading}
            sx={{ fontSize: "12px", backgroundColor: "orange", "&:hover": { backgroundColor: "#e68900" }, textTransform: "none", marginRight: "14px" }}
          >
            {isLoading ? <span>Editing </span>: <span>Edit</span>}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
