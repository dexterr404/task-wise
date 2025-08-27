import { 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton, } from "@mui/material";
  import { Link } from "react-router-dom";
  import { useState } from "react";
  import { Task, Visibility, VisibilityOff } from "@mui/icons-material";
  import  GoogleIcon  from "../../assets/google-icon.svg"
  import TaskIcon from "../../assets/task-icon.png"

function LoginModal() {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
    <div className="flex flex-col h-dvh items-center justify-center">
        <div className="flex flex-col bg-white max-sm:px-4 px-24 py-18 shadow-lg rounded-lg items-center gap-4">
            <div className="flex flex-col justify-center items-center mb-6">
                <img width="24" height="24" src={TaskIcon} alt="task-icon"/>
                <h1 className="text-2xl font-semibold">Let's Get Started</h1>
                <h6 className="text-sm">Ready to be smart in tasks? Please enter your details.</h6>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <span className="text-xs font-semibold">Email</span>
                <input placeholder="Your email address" 
                className="border-1 w-full border-gray-400 text-sm rounded-md text-gray-800 px-3 py-1 placeholder:text-xs">
                </input>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between text-xs">
                    <span className="font-semibold">
                        Password
                    </span>
                    <span className="underline cursor-pointer text-gray-600 font-semibold hover:opacity-80">
                        Forgot Password?
                    </span>
                </div>
                <div className="relative">
                    <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    className="border-1 w-full border-gray-400 text-sm  rounded-md text-gray-800 px-3 py-1 placeholder:text-xs"></input>
                    <div className="absolute right-3 top-0">
                        <IconButton sx={{ p: 0 }} onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? <Visibility fontSize="small"/> : <VisibilityOff fontSize="small"/>}
                        </IconButton>
                    </div>
                </div>
            </div>
            <Button
            fullWidth
            size="small"
            variant="contained"
            sx={{
                textTransform: "none",
                backgroundColor: "black",
                color: "white",
                borderRadius: "0.375rem",
                fontSize: "0.75rem",
                paddingY: "0.5rem",
                "&:hover": {
                opacity: 0.8,
                backgroundColor: "black",
                },
                "&:active": {
                opacity: 0.7,
                backgroundColor: "black",
                },
            }}
            >
            Sign in
            </Button>
            <Button
            variant="outlined"
            startIcon={<img src={GoogleIcon} alt="Google" style={{ width: 18, height: 18 }} />}
            sx={{ textTransform: "none", width: "100%",fontSize: "12px" }}>
            Sign in with Google
            </Button>
            <div className="text-sm flex gap-1 items-center">
                <span>Don't have an account yet?</span>
                <span className="font-semibold cursor-pointer hover:opacity-80">Sign up</span>
            </div>
        </div>
    </div>
    )
}

export default LoginModal