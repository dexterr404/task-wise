import {useState} from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography} from "@mui/material";
import {toast} from "react-hot-toast"
import { deleteTask } from "../../api/taskService";

function DeleteTaskModal({open,onClose,onDelete,taskId}) {
  const [isloading, setIsLoading] = useState(false);

  const handleDelete = async() => {
    setIsLoading(true);
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully")
      onDelete();
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
        Do you really want to delete task?
      </Typography>
      </DialogTitle>
      <DialogContent />

      <DialogActions sx={{ justifyContent: "flex-end"}}>
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
          Cancel
        </Button>  
        <Button
          sx={{
            backgroundColor: "red",
            color: "white",
            fontSize: "12px",
            paddingX: "8px",
            paddingY: "4px",
            ml: 1,
            "&:hover": { opacity: 0.8, backgroundColor: "red" },
          }}
          onClick={() => {
            handleDelete();
          }}
          disabled={isloading}
        >
          { isloading ? <span className="text-white">Deleting</span> : <span>Delete</span>}
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default DeleteTaskModal;
