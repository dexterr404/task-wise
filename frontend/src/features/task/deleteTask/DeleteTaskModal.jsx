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

function DeleteTaskModal({open,onClose,onDelete}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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
          onClick={() => {
            onDelete();
            setSnackbarOpen(true);
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    <Snackbar
    open={snackbarOpen}
    autoHideDuration={7000}
    onClose={() => setSnackbarOpen(false)}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
    <Alert severity="success" sx={{ width: "100%" }}>
        Task deleted successfully!
    </Alert>
    </Snackbar>
    </>
  );
}

export default DeleteTaskModal;
