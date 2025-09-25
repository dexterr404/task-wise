import { useState } from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Divider,} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout } from "./authSlice";
import { useDispatch } from "react-redux";
import { clearUser } from "../user/userSlice";
import { colors } from "../../data/colors.js"


function LogoutModal({open,onClose,setTasks}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    setIsLoading(true);
    try {
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         dispatch(logout());
         dispatch(clearUser())
        console.log("logged out");
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
      <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <Logout fontSize="small" sx={{ color: colors.darkRed}}/>Are you sure you want to logout?
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
          You will be logged out of your account. You will need to log in again to access your data.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
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
            textTransform: "none"
          }}
        >
          {isLoading ? <span className="text-white">Logging out</span> : <span>Logout</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutModal;
