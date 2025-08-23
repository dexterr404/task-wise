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
import {Link} from 'react-router-dom'

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function AddTask({ categoryName, onClose, onTaskAdded }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    name: categoryName || "",
    description: "",
    dueDate: "",
    priority: "medium",
    subtasks: [],
  });

  useEffect(() => {
    setTaskData((prev) => ({ ...prev, name: categoryName || "" }));
  }, [categoryName]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...taskData.subtasks];
    newSubtasks[index].title = value;
    setTaskData({ ...taskData, subtasks: newSubtasks });
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
    onTaskAdded?.();
    onClose();
    setTaskData({
      name: categoryName || "",
      description: "",
      dueDate: "",
      priority: "medium",
      subtasks: [],
    });
    setSnackbarOpen(true);
  };

  return (
    <>
      <Dialog open={true} fullWidth maxWidth="sm" onClose={onClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            name="name"
            fullWidth
            margin="dense"
            InputProps={{
              style: { fontSize: 14 },
            }}
            value={taskData.name}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="dense"
            multiline
            rows={3}
            InputProps={{
              style: { fontSize: 14 },
            }}
            value={taskData.description}
            onChange={handleChange}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            margin="dense"
            InputProps={{
              style: { fontSize: 14 },
            }}
            InputLabelProps={{ shrink: true }}
            value={taskData.dueDate}
            onChange={handleChange}
          />
          <TextField
            label="Priority"
            name="priority"
            select
            fullWidth
            margin="dense"
            value={taskData.priority}
            onChange={handleChange}
            InputProps={{
              style: { fontSize: 14 },
            }}
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
          <Link to={"/Task"}>
          <Button
          onClick={onClose} 
          style={ 
            {color: "#484848",
              fontSize: "12px",
              paddingX: "8px",
              paddingY: "4px"
            } }>Cancel</Button>     
          </Link>
          <Button
            onClick={handleSave}
            variant="contained"
            style={{ backgroundColor: "#14532d",
            fontSize: "12px",
            paddingX: "8px",
            marginRight: "16px",
            paddingY: "4px"
             }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={7000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Task added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
