import {useState} from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast"

function DeleteTaskModal({open,onClose,onDelete,taskId}) {
  const [isloading, setIsLoading] = useState(false);

  const handleDelete = async() => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${taskId}`);
      toast.error("Task deleted successfully")
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

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Link to={"/Task"}>
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
        </Link>
        <Link to={"/Task"}>
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
          onClick={(e) => {
            onDelete();
            handleDelete();
          }}
        >
          Delete
        </Button>
        </Link>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default DeleteTaskModal;
