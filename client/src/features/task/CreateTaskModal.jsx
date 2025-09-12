import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,MenuItem,IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const priorities = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export default function CreateTask({ categoryName,onClose,onCreateTask,open }) {
  const initialTaskData = {
      title: categoryName || "",
      description: "",
      deadline: "",
      priority: "Medium",
      subtasks: [],
    };

  const [taskData, setTaskData] = useState(initialTaskData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categoryName) {
      setTaskData((prev) => ({
        ...prev,
        title: categoryName,
      }));
    }
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
      subtasks: [...taskData.subtasks, { title: "", status: "Not Started" }],
    });
  };

  const handleRemoveSubtask = (index) => {
    const newSubtasks = taskData.subtasks.filter((_, i) => i !== index);
    setTaskData({ ...taskData, subtasks: newSubtasks });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const {title,description,deadline,priority,subtasks} = taskData;
    if (
      !title.trim() ||
      !description.trim() ||
      !deadline.trim() ||
      !priority.trim()
    ) {
      toast.error("Fill all the required fields!");
      return;
    }

    //Filter and transform empty subtasks
    const validSubtasks = subtasks
    .filter(sub => sub.title && sub.title.trim() !== "")
    .map(sub => ({ ...sub, title: sub.title.trim()}));

    setIsLoading(true);
    try {
      await onCreateTask({title,description,deadline,priority,subtasks:validSubtasks});
      setTaskData(initialTaskData);
      onClose();
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
      toast.error("Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm" PaperProps={{
        sx: { borderRadius: 2, p: 1 },
      }}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="*Task Name"
            name="title"
            fullWidth
            margin="dense"
            InputProps={{
              style: { fontSize: 14 },
            }}
            value={taskData.title}
            onChange={handleChange}
          />
          <TextField
            label="*Description"
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
            label="*Due Date"
            name="deadline"
            type="date"
            fullWidth
            margin="dense"
            InputProps={{
              style: { fontSize: 14 },
            }}
            InputLabelProps={{ shrink: true }}
            value={taskData.deadline}
            onChange={handleChange}
          />
          <TextField
            label="*Priority"
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
            + Add Subtask <span className="text-[8px] text-gray-500 ml-1">(Not required)</span>
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
          Cancel
          </Button>     
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isLoading}
            sx={{ fontSize: "12px", backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#388E3C" }, textTransform: "none", marginRight: "14px" }}
          >{
            isLoading ? <div className="text-white">Creating</div> : <div>Create</div>
          }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
