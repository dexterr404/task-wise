import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,MenuItem,IconButton, Divider } from "@mui/material";
import { Add, AddBox,Delete } from "@mui/icons-material";
import { colors } from "../../data/colors";

const priorities = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export default function CreateTask({ categoryName,onClose,onAddTask,open }) {
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
      await onAddTask({title,description,deadline,priority,subtasks:validSubtasks});
      setTaskData(initialTaskData);
      onClose();
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
        sx: { bgcolor: "var(--color-surface)", color: "var(--color-text-secondary)", borderRadius: 2, p: 1 },
      }}>
        <DialogTitle variant="h8" sx={{ color: "var(--color-text-primary)", display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
          <AddBox fontSize="small" sx={{ color: colors.darkGreen}}/>Add New Task
        </DialogTitle>
        <Divider sx={{ borderColor: "var(--color-border)"}}/>
        <DialogContent>
          <TextField
            label="*Task Name"
            name="title"
            fullWidth
            margin="dense"
            InputProps={{
              style: { fontSize: 14, color: "var(--color-text-secondary)" },
            }}
            InputLabelProps={{
              style: { color: "var(--color-text-primary)", fontSize: 14 },
            }}
            sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--color-border)",
              },
              "&:hover fieldset": {
                borderColor: "var(--color-text-secondary)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--color-text-primary)",
              },
            }}}
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
              style: { fontSize: 14, color: "var(--color-text-secondary)" },
            }}
            InputLabelProps={{
              style: { color: "var(--color-text-primary)", fontSize: 14 },
            }}
            sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--color-border)",
              },
              "&:hover fieldset": {
                borderColor: "var(--color-text-secondary)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--color-text-primary)",
              },
            }}}
            value={taskData.description}
            onChange={handleChange}
          />
          <TextField
            label="*Due Date"
            name="deadline"
            type="date"
            fullWidth
            margin="dense"
             InputProps={
            { min: new Date().toISOString().split("T")[0], 
            style: { fontSize: 14, color: "var(--color-text-secondary)" } 
            }}
            sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--color-border)",
              },
              "&:hover fieldset": {
                borderColor: "var(--color-text-secondary)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--color-text-primary)",
              },
               "& input[type='date']::-webkit-calendar-picker-indicator": {
                filter: "invert(0.5)",
                cursor: "pointer",
              },
            }}}
            InputLabelProps={{ shrink: true, style: { color: "var(--color-text-primary)" }}}
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
              style: { fontSize: 14, color: "var(--color-text-secondary)"},
            }}
            InputLabelProps={{
              style: { color: "var(--color-text-primary)" },
            }}
            sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--color-border)",
              },
              "&:hover fieldset": {
                borderColor: "var(--color-text-secondary)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--color-text-primary)",
              },
              "& .MuiSelect-icon": {
                color: "var(--color-text-secondary)",
              },
              "& .MuiSelect-select": {
                color: "var(--color-text-primary)",
                fontSize: 14,
              },
            }}}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text-primary)",
                    py: 0.5,
                  },
                },
              },
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
                  style: { fontSize: 14, color: "var(--color-text-secondary)" },
                }}
                InputLabelProps={{
                  style: { fontSize: 14, color: "var(--color-text-primary)"},
                }}
                sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--color-border)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-text-secondary)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                }}}
                fullWidth
                value={subtask.title}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
              />
              <IconButton color="error" onClick={() => handleRemoveSubtask(index)}>
                <Delete fontSize="small"/>
              </IconButton>
            </div>
          ))}
          <Button size="small" onClick={handleAddSubtask} sx={{ mt: 1, color: "var(--color-text-primary)" }} style={ {fontWeight: "bold"} }>
            + Add Subtask <span className="text-[8px] text-text-secondary ml-1">(Not required)</span>
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-secondary)"}}>
          Cancel
          </Button>     
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isLoading}
            sx={{ fontSize: "12px", backgroundColor: "#388E3C", "&:hover": { backgroundColor: "#2E7D32" }, textTransform: "none", marginRight: "14px" }}
          >{
            isLoading ? <div className="text-white">Creating</div> : <div>Create</div>
          }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
