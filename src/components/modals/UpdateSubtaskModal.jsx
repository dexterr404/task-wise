import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";

function UpdateSubtaskModal({open,onClose}) {
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
      <Typography variant="subtitle1" fontWeight={600}>
        Upate subtasks status here
      </Typography>
      </DialogTitle>

      <DialogContent />

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "grey",
            color: "white",
            "&:hover": { opacity: 0.8, backgroundColor: "grey" },
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: "red",
            color: "white",
            ml: 1,
            "&:hover": { opacity: 0.8, backgroundColor: "red" },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateSubtaskModal;
