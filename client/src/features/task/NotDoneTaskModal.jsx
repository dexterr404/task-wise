import { useState } from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography,} from "@mui/material";
import toast from "react-hot-toast";
import { unDoneTask } from "../../api/taskService";

function NotDoneTaskModal({open,onClose,task,fetchTask}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDone = async() => {
    const {name,description,deadline,priority,subtasks} = task;

    setIsLoading(true);
    try {
      await unDoneTask(task._id,name,description,deadline,priority,subtasks);
      fetchTask();
      toast.success("Undone task");
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
          Not yet
        </Button>
        <Button
          onClick={() => handleDone()}
          disabled={isLoading}
          variant="contained"
          sx={{ fontSize: "12px", backgroundColor: "#d4af0d", "&:hover": { backgroundColor: "#f1c915" }, textTransform: "none", marginRight: "14px" }}
        >
          {isLoading ? <span>Updating</span> : <span>Not Done</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotDoneTaskModal;
