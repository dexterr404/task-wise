import {useState} from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography} from "@mui/material";
import {toast} from "react-hot-toast"
import { deleteTeam } from "../../api/teamService";

function DeleteTeamModal({open,onClose,team,setTeams,closeOption}) {
  const [isLoading, setIsLoading] = useState(false);

  //Delete Task from database
  const handleDelete = async() => {
    setIsLoading(true);
    try {
        await deleteTeam(team._id);
        toast.success("Team successfully deleted");
        setTeams((prev) => prev.filter((t) => t._id !== team._id));
        closeOption();
        onClose();
    } catch (error) {
        console.log("Error:", error.message);
        toast.error("Failed to delete the team");
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
        Do you really want to delete the team?
      </Typography>
      </DialogTitle>
      <DialogContent />

      <DialogActions sx={{ justifyContent: "flex-end"}}>
        <Button onClick={onClose} sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
          Cancel
        </Button>  
        <Button
          onClick={handleDelete}
          variant="contained"
          sx={{ fontSize: "12px", backgroundColor: "#b71c1c", "&:hover": { backgroundColor: "#d32f2f" }, textTransform: "none", marginRight: "14px" }}
          >
          {isLoading ? "Deleting" : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default DeleteTeamModal;
