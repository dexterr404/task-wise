import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";

function DoneTaskModal({open,onClose}) {
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
        Done with the task?
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
          Not yet
        </Button>
        <Button
          sx={{
            backgroundColor: "green",
            color: "white",
            ml: 1,
            "&:hover": { opacity: 0.8, backgroundColor: "green" },
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DoneTaskModal;
