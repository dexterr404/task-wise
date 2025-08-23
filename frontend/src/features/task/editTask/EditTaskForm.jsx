import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const priorities = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export default function EditTask({task,open,categoryName, onClose }) {
  const {title,description,deadline,priority} = task;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    name: title,
    description: description,
    deadline: deadline,
    priority: priority,
    subtasks: [],
  });

  useEffect(() => {
    if (task) {
      setTaskData({
        name: task.title || "",
        description: task.description || "",
        deadline: task.deadline || "",
        priority: task.priority || "medium",
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
      subtasks: [...taskData.subtasks, { title: "", completed: false }],
    });
  };

  const handleRemoveSubtask = (index) => {
    const newSubtasks = taskData.subtasks.filter((_, i) => i !== index);
    setTaskData({ ...taskData, subtasks: newSubtasks });
  };

  const handleSave = () => {
    console.log("Task Data:", taskData);
    onClose();
    setTaskData({
      name: categoryName || "",
      description: "",
      deadline: "",
      priority: "medium",
      subtasks: [],
    });
    setSnackbarOpen(true);
    onClose();
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm" disableEnforceFocus={false} onClose={onClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            name="name"
            InputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
            margin="dense"
            value={taskData.name}
            onChange={handleChange}
          />
          <TextField
            label="Description"
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
            label="Due Date"
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
            label="Priority"
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
            style={
            {color: "#484848", 
            fontSize: "12px",
            paddingX: "8px",
            paddingY: "4px",} }>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            style={{ 
            backgroundColor: "orange",
            fontSize: "12px",
            paddingX: "8px",
            marginRight: "16px",
            paddingY: "4px", }}
          >
            Finish
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Task edited successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
