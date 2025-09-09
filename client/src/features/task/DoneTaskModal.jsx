import { useState } from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography,} from "@mui/material";
import toast from "react-hot-toast";
import { updateTaskStatus } from "../../api/taskService";

function DoneTaskModal({open,onClose,task,fetchTask}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDone = async() => {
    const {name,description,deadline,priority,subtasks} = task;

    setIsLoading(true);
      try {
        await updateTaskStatus(task._id,name,description,deadline,priority,subtasks)
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
          sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleDone()}
          disabled={isLoading}
          variant="contained"
          sx={{ fontSize: "12px", backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#388E3C" }, textTransform: "none", marginRight: "14px" }}
        >
          {isLoading ? <span className="text-white">Updating</span> : <span>Done</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DoneTaskModal;
