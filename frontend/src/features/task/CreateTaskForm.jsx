import { useState, useEffect } from "react";
import {Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,MenuItem,IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from 'react-router-dom'
import {toast} from 'react-hot-toast';
import { createTask } from "../../api/taskService.js"

const priorities = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export default function CreateTask({ categoryName,onClose,fetchTask }) {
  const [taskData, setTaskData] = useState({
    name: categoryName || "",
    description: "",
    dueDate: "",
    priority: "Medium",
    subtasks: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTaskData((prev) => ({ ...prev, name: categoryName || "" }));
  }, []);

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
    const {name,description,dueDate,priority,subtasks} = taskData;
    if (
      !name.trim() ||
      !description.trim() ||
      !dueDate.trim() ||
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
      await createTask(name,description,dueDate,priority,validSubtasks);
      fetchTask();
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
      <Dialog open={true} fullWidth maxWidth="sm">
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="*Task Name"
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
            disabled={isLoading}
            style={{ backgroundColor: "#14532d",
            fontSize: "12px",
            paddingX: "8px",
            marginRight: "16px",
            paddingY: "4px"
             }}
          >{
            isLoading ? <div className="text-white">Creating</div> : <div>Create</div>
          }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
