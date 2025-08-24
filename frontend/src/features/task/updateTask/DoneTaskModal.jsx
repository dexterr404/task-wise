import { useState } from "react";
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

function DoneTaskModal({open,onClose,task,fetchTask}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDone = async() => {
    const {name,description,deadline,priority,subtasks} = task;

    setIsLoading(true);
    try {
      await axios.put(`http://localhost:5001/api/tasks/${task._id}`,{
        title: name,
        description,
        deadline,
        priority,
        status: "Done",
        subtasks
      });
      fetchTask();
      toast.success("Done task");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
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
      <Typography variant="subtitle1">
        Done with the task?
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
          Not yet
        </Button>
        <Button
          onClick={() => handleDone()}
          sx={{
            backgroundColor: "green",
            color: "white",
            fontSize: "12px",
            paddingX: "8px",
            paddingY: "4px",
            ml: 1,
            "&:hover": { opacity: 0.8, backgroundColor: "green" },
          }}
        >
          {isLoading ? <span>Updating</span> : <span>Done</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DoneTaskModal;
