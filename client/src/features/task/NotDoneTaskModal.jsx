import { useState } from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Divider,} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { colors } from "../../data/colors";
import { useLocation } from "react-router-dom";

function NotDoneTaskModal({open,onClose,task,onUndoneTask}) {
  const { pathname } = useLocation();
  const isTeams = pathname.includes("teams");

  const [isLoading, setIsLoading] = useState(false);

  const handleDone = async() => {
    const {title,description,deadline,priority,subtasks} = task;

    const updatedTask =({
      title,
      description,
      deadline,
      status: isTeams ? "Doing" : "Ongoing",
      priority,
      subtasks,
    })

    setIsLoading(true);
    try {
      await onUndoneTask(updatedTask);
      onClose();
    } catch (error) {
      console.log("Error updating task", error);
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
        sx: { bgcolor: "var(--color-surface)", color: "var(--color-text-secondary)", borderRadius: 2, p: 1 },
      }}
    >
      <DialogTitle variant="h8" sx={{ color: "var(--color-text-primary)", display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <Cancel fontSize="small"  sx={{ color: colors.yellow }}/> Done with the task?
      </DialogTitle>
      <Divider sx={{ borderColor: "var(--color-border)"}}/>
      <DialogContent>
        <Typography sx={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
          This will mark the task as not completed. You can mark it done again later.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-secondary)"}}
        >
          Not yet
        </Button>
        <Button
          onClick={() => handleDone()}
          disabled={isLoading}
          variant="contained"
          sx={{ fontSize: "12px", backgroundColor: colors.orange, "&:hover": { backgroundColor: colors.darkOrange }, textTransform: "none", marginRight: "14px" }}
        >
          {isLoading ? <span>Updating</span> : <span>Not Done</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotDoneTaskModal;
