import {useState} from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography,} from "@mui/material";
import toast from "react-hot-toast";
import { duplicateTask } from "../../api/taskService";
import { useSelector } from "react-redux";

function DuplicateTaskModal({open,onClose,task,onDuplicateTask}) {
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);

  //Duplicate task in database
  const handleDuplicate = async() => {
    setIsLoading(true);
    const {title,description,deadline,priority,subtasks} = task;

    try {
        const newTask = ({
          title,
          description,
          deadline,
          priority,
          subtasks
        })
        await onDuplicateTask(newTask);
        toast.success("Task duplicated successfully");
      } catch (error) {
        toast.error("Failed to duplicate task");
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
          sx={{ fontSize: "12px", backgroundColor: "#2196F3", "&:hover": { backgroundColor: "#1976D2" }, textTransform: "none", marginRight: "14px" }}
        >
          { isLoading ? <span className="text-white">Duplicating</span> : <span>Duplicate</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DuplicateTaskModal;
