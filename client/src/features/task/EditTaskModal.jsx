import { useState, useEffect } from "react";
import {Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,MenuItem,IconButton, Divider} from "@mui/material";
import { colors } from "../../data/colors";
import { Edit } from "@mui/icons-material";

import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";


const priorities = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export default function EditTask({task,open,onClose,onUpdateTask}) {
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
        await onUpdateTask({title,description,deadline,priority,subtasks:validSubtasks,status});
        toast.success("Task updated successfully");
        onClose();
      } catch (error) {
        console.error("Error editing task:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm"
      PaperProps={{
        sx: { bgcolor: "var(--color-surface)", color: "var(--color-text-secondary)", borderRadius: 2, p: 1 },
      }}
       disableEnforceFocus={false} onClose={onClose}>
        <DialogTitle variant="h8" sx={{ color: "var(--color-text-primary)", display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
          <Edit fontSize="small" sx={{ color: colors.darkOrange}}/> Edit Task
        </DialogTitle>
        <Divider sx={{ borderColor: "var(--color-border)"}}/>
        <DialogContent>
          <TextField
            label="*Task Name"
            name="title"
            InputProps={{
              style: { fontSize: 14, color: "var(--color-text-secondary)" },
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
            }}}
            fullWidth
            margin="dense"
            value={taskData.title}
            onChange={handleChange}
          />
          <TextField
            label="*Description"
            name="description"
            InputProps={{
              style: { fontSize: 14, color: "var(--color-text-secondary)" },
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
            }}}
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
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true, style: { color: "var(--color-text-primary)" }}}
            value={taskData.deadline.split("T")[0] }
            onChange={(e) => handleDeadlineChange(e.target.value)}
          />
          <TextField
            label="*Priority"
            name="priority"
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
            select
            fullWidth
            margin="dense"
            value={taskData.priority}
            onChange={handleChange}
          >
            {priorities.map((option) => (
              <MenuItem 
              sx={{
                fontSize: 14,
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text-secondary)",
                "&.Mui-selected": {
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-text-primary)",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "var(--color-accent)",
                },
                "&:hover": {
                  backgroundColor: "var(--color-border)",
                  color: "var(--color-text-primary)",
                },
              }}
              key={option.value} value={option.value}
              >
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
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </div>
          ))}
          <Button size="small" onClick={handleAddSubtask} sx={{ mt: 1, color: "var(--color-text-primary)" }} style={ {fontWeight: "bold"} }>
            + Add Subtask
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} 
            sx={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-secondary)"}}>Cancel</Button>
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
