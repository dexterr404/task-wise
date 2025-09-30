import { useState } from "react";
import { Dialog,DialogTitle,DialogActions,Button,DialogContent, Divider, Typography } from "@mui/material";
import { colors } from "../../data/colors";

import { CheckCircle } from "@mui/icons-material";

function DoneTaskModal({open,onClose,task,onDoneTask}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDone = async() => {
    const {title,description,deadline,priority,subtasks} = task;

    setIsLoading(true);

    const updatedTask = {
      title,
      description,
      deadline,
      status: "Done",
      priority,
      subtasks,
    }
    try {
      await onDoneTask(updatedTask);
      onClose();
    } catch (error) {
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
        sx: { bgcolor: "var(--color-surface)", color: "var(--color-text-secondary)", borderRadius: 2, p: 1 },
      }}
    >
      <DialogTitle  variant="h8" sx={{ color: "var(--color-text-primary)", display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <CheckCircle fontSize="small"  sx={{ color: colors.darkGreen }}/> Done with the task?
      </DialogTitle>
      <Divider sx={{ borderColor: "var(--color-border)"}}/>
      <DialogContent>
        <Typography sx={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
          This will mark the task as completed. You can always mark it as not completed later if needed.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-secondary)"}}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleDone()}
          disabled={isLoading}
          variant="contained"
          sx={{ fontSize: "12px", backgroundColor: "#388E3C", "&:hover": { backgroundColor: "#2E7D32" }, textTransform: "none", marginRight: "14px" }}
        >
          {isLoading ? <span className="text-white">Updating</span> : <span>Done</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DoneTaskModal;
