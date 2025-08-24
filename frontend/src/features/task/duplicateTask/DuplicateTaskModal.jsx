import {useState} from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

function DuplicateTaskModal({open,onClose,fetchTask,task}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDuplicate = async() => {
    setIsLoading(true);
    const {title,description,deadline,priority,subtasks} = task;

    try {
        await axios.post("http://localhost:5001/api/tasks", {
        title,
        description,
        deadline,
        priority,
        subtasks
        });
        toast.success("Task duplicated successfully");
      } catch (error) {
        toast.error("Failed to duplicate task");
      } finally {
        setIsLoading(false);
        fetchTask();
      }
    }

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
      <Typography variant="subtitle1" sx={{fontSize: "1rem"}}>
        Duplicate the task?
      </Typography>
      </DialogTitle>

      <DialogContent />

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "grey",
            color: "white",
            fontSize: "12px",
            paddingX: "8px",
            paddingY: "4px",
            "&:hover": { opacity: 0.8, backgroundColor: "grey" },
          }}
        >
          Don't
        </Button>
        <Button
          onClick={() => handleDuplicate()}
          sx={{
            backgroundColor: "blue",
            color: "white",
            fontSize: "12px",
            paddingX: "8px",
            paddingY: "4px",
            ml: 1,
            "&:hover": { opacity: 0.8, backgroundColor: "blue" },
          }}
        >
          Duplicate
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DuplicateTaskModal;
