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
          sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
        >
          Cancel
        </Button>  
        <Button
        variant="contained"
         sx={{ fontSize: "12px", backgroundColor: "#b71c1c", "&:hover": { backgroundColor: "#d32f2f" }, textTransform: "none", marginRight: "14px" }}
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
