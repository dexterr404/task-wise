import { useState } from "react";
import { Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Divider } from "@mui/material";
import { toast } from "react-hot-toast"
import { ReportProblemRounded } from "@mui/icons-material";
import { colors } from "../../data/colors.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RemoveUserModal({open,onClose,user,onRemoveUser}) {
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleRemoveUser = async() => {
    setIsLoading(true);
    try {
        await onRemoveUser();
        if(user._id === currentUser.id) {
          navigate('/dashboard/'+currentUser.id)
          toast.success("You have left the team");
          return
        }
        toast.success("User successfully removed");
        onClose();
    } catch (error) {
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
      <DialogTitle variant="h8" sx={{color: "var(--color-text-primary)", display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <ReportProblemRounded sx={{ color: colors.darkRed }}/>Do you really want to remove this member?
      </DialogTitle>
      <Divider sx={{ borderColor: "var(--color-border)"}}/>
      <DialogContent >
        <Typography sx={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
          This action cannot be undone. You need to invite the user again to join.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end"}}>
          <Button onClick={onClose} sx={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-secondary)"}}>
            Cancel
          </Button>  
          <Button
            onClick={handleRemoveUser}
            variant="contained"
            disabled={isLoading}
            sx={{ fontSize: "12px", backgroundColor: "#b71c1c", "&:hover": { backgroundColor: "#d32f2f" }, textTransform: "none", marginRight: "14px" }}
            >
            {isLoading ? "Removing" : "Remove"}
          </Button>
        </DialogActions>
    </Dialog>
    </>
  );
}

export default RemoveUserModal;
