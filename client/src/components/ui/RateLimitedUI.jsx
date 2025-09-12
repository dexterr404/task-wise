import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FlashOnIcon from "@mui/icons-material/FlashOn";

const RateLimitedUI = () => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity="warning"
        icon={<FlashOnIcon fontSize="inherit" />}
        sx={{ width: "100%" }}>
        <strong>Rate Limit Reached</strong> — You've made too many requests.
        Please wait a moment before trying again.
      </Alert>
    </Snackbar>
  );
};

export default RateLimitedUI;
