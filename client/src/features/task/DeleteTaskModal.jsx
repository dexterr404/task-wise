import {useState} from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Divider} from "@mui/material";
import {toast} from "react-hot-toast"
import { colors } from "../../data/colors";
import { ReportProblemRounded  } from "@mui/icons-material";

function DeleteTaskModal({open,onClose,onDelete}) {
  const [isloading, setIsLoading] = useState(false);

  const handleDelete = async() => {
    setIsLoading(true);
    try {
      await onDelete();
      toast.success("Task deleted successfully")
    } catch (error) {
      toast.error("Failed to delete task");
      console.log("Error deleting task", error);
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
      <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <ReportProblemRounded sx={{ color: colors.darkRed }}/>Do you really want to delete the task?
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
          This action cannot be undone. All data associated with this task will be lost.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end"}}>
        <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
        >
          Cancel
        </Button>  
        <Button
        variant="contained"
         sx={{ fontSize: "12px", backgroundColor: "#d32f2f", "&:hover": { backgroundColor: "#b71c1c" }, textTransform: "none", marginRight: "14px" }}
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
