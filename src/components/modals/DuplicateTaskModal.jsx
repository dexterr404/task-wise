import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";

function DuplicateTaskModal({open,onClose}) {
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
        Duplicate the task?
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
          Don't
        </Button>
        <Button
          sx={{
            backgroundColor: "blue",
            color: "white",
            ml: 1,
            "&:hover": { opacity: 0.8, backgroundColor: "blue" },
          }}
        >
          Duplicate
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DuplicateTaskModal;
