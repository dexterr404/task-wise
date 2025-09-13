import { useState } from "react";
import { Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography } from "@mui/material";

import toast from "react-hot-toast";

function DoneTaskModal({open,onClose,task,onDoneTask}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDone = async() => {
    const {title,description,deadline,priority,subtasks} = task;

    setIsLoading(true);

    const updatedTask = {
      title,
      description,
      deadline,
      status: "Done",
      priority,
      subtasks,
    }
    console.log(updatedTask);
      try {
        await onDoneTask(updatedTask);
        onClose();
        toast.success("Done task");
      } catch (error) {
        toast.error("Failed to update status");
        console.log(error);
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
          sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleDone()}
          disabled={isLoading}
          variant="contained"
          sx={{ fontSize: "12px", backgroundColor: "#388E3C", "&:hover": { backgroundColor: "#2E7D32" }, textTransform: "none", marginRight: "14px" }}
        >
          {isLoading ? <span className="text-white">Updating</span> : <span>Done</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DoneTaskModal;
