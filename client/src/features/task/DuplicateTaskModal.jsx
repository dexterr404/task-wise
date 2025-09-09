import {useState} from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography,} from "@mui/material";
import toast from "react-hot-toast";
import { duplicateTask } from "../../api/taskService";

function DuplicateTaskModal({open,onClose,fetchTask,task}) {
  const [isLoading, setIsLoading] = useState(false);

  //Duplicate task in database
  const handleDuplicate = async() => {
    setIsLoading(true);
    const {title,description,deadline,priority,subtasks} = task;

    try {
        await duplicateTask(title,description,deadline,priority,subtasks);
        toast.success("Task duplicated successfully");
      } catch (error) {
        toast.error("Failed to duplicate task");
        console.log(error);
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
          sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
        >
          Don't
        </Button>
        <Button
          onClick={() => handleDuplicate()}
          disabled={isLoading}
          variant="contained"
          sx={{ fontSize: "12px", backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#2196F3" }, textTransform: "none", marginRight: "14px" }}
        >
          { isLoading ? <span className="text-white">Duplicating</span> : <span>Duplicate</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DuplicateTaskModal;
