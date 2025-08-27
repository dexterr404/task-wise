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
  import CloseIcon from "@mui/icons-material/Close";

export default function RegisterModal() {
     const [showPassword, setShowPassword] = useState(false);
        
        return (
        <div className="flex flex-col h-dvh items-center justify-center">
            <div className="flex flex-col relative bg-white max-sm:px-4 px-24 py-18 shadow-lg rounded-lg items-center gap-4">
                <div className="absolute top-2 right-2 ">
                <IconButton>
                    <CloseIcon />
                </IconButton>
            </div>
                <div className="flex flex-col justify-center items-center mb-6">
                    <img width="24" height="24" src={TaskIcon} alt="task-icon"/>
                    <h1 className="text-2xl font-semibold">Get Started for Free</h1>
                    <h6 className="text-sm">Sign up with your details to organize and track your work easily.</h6>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <span className="text-xs font-semibold">Email</span>
                    <input placeholder="Your email address" 
                    className="border-1 w-full border-gray-400 text-sm rounded-md text-gray-800 px-3 py-1 placeholder:text-xs">
                    </input>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <span className="font-semibold text-xs">
                        Password
                    </span>
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
                <div className="flex flex-col gap-1 w-full">
                    <span className="font-semibold text-xs">
                        Confirm password
                    </span>
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
                Create Account
                </Button>
            </div>
        </div>
        )
}