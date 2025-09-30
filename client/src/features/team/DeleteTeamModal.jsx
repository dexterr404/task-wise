import {useState} from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Divider} from "@mui/material";
import {toast} from "react-hot-toast"
import { ReportProblemRounded } from "@mui/icons-material";
import { colors } from "../../data/colors.js";

function DeleteTeamModal({open,onClose,closeOption,onDeleteTeam}) {
  const [isLoading, setIsLoading] = useState(false);

  //Delete Task from database
  const handleDelete = async() => {
    setIsLoading(true);
    try {
        await onDeleteTeam()
        toast.success("Team successfully deleted");
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
        sx: { bgcolor: "var(--color-surface)", color: "var(--color-text-secondary)", borderRadius: 2, p: 1 },
      }}
    >
      <DialogTitle variant="h8" sx={{ color: "var(--color-text-primary)", display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <ReportProblemRounded sx={{ color: colors.darkRed }}/>Do you really want to delete the team?
      </DialogTitle>
      <Divider sx={{ borderColor: "var(--color-border)"}}/>
      <DialogContent >
        <Typography sx={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
          This action cannot be undone. All data associated with this team will be lost.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end"}}>
          <Button onClick={onClose} sx={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-secondary)"}}>
            Cancel
          </Button>  
          <Button
            onClick={handleDelete}
            disabled={isLoading}
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
