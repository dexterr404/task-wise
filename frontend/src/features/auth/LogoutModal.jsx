import { useState } from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography,} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function LogoutModal({open,onClose,setTasks}) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async() => {
    setIsLoading(true);
    try {
         localStorage.removeItem("token");
        console.log("logged out");
        setTasks([]);
        navigate("/login");
    } catch (error) {
        toast.error("Error logging out");
    }
  }

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
      <Typography variant="subtitle1">
        Are you sure you want to logout?
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
          disabled={isLoading}
          onClick={() => handleLogout()}
          sx={{
            backgroundColor: "red",
            color: "white",
            fontSize: "12px",
            paddingX: "8px",
            paddingY: "4px",
            ml: 1,
            "&:hover": { opacity: 0.8, backgroundColor: "red" },
          }}
        >
          {isLoading ? <span className="text-white">Logging out</span> : <span>Logout</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutModal;
