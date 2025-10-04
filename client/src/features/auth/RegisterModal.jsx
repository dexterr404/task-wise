import { useDispatch } from "react-redux";
import { registerUser } from "../../api/authService";
import { Button,IconButton, } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TaskIcon from "../../assets/task-icon.png"
import CloseIcon from "@mui/icons-material/Close";

export default function RegisterModal() {
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");

     const navigate = useNavigate();

     const handleRegister = async(name,email,password) => {
        
        if ( !name || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }
        //Valid email check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        //Password Check
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }
        //Confirm
        const passwordMatched = password === confirmPassword;
        if (!passwordMatched) {
            toast.error("Password confirmation failed");
            return;
        }
        setIsLoading(true)
        try {
            await registerUser(name,email,password);
            
            toast.success("Registration completed");
            navigate("/login");
        } catch (error) {
            toast.error("Failed to register account");
        } finally {
            setIsLoading(false);
        }
     }
        
        return (
        <div className="flex flex-col h-dvh items-center justify-center">
            <div className="flex flex-col absolute bg-white max-sm:px-4 px-24 py-18 shadow-lg rounded-lg items-center gap-2">
                <div className="absolute top-2 right-2 ">
                <Link to='/login'>
                <IconButton>
                    <CloseIcon />
                </IconButton>
                </Link>
            </div>
                <div className="flex flex-col justify-center items-center mb-6">
                    <img width="24" height="24" src={TaskIcon} alt="task-icon"/>
                    <h1 className="text-2xl font-semibold">Get Started for Free</h1>
                    <h6 className="text-sm">Ready to be wise in tasks? Please enter your details.</h6>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <span className="text-xs font-semibold">Name</span>
                    <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name" 
                    className="border-1 w-full border-gray-400 text-sm rounded-md text-gray-800 px-3 py-1 placeholder:text-xs">
                    </input>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <span className="text-xs font-semibold">Email</span>
                    <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Your password"
                        className="border-1 w-full border-gray-400 text-sm  rounded-md text-gray-800 mb-2 px-3 py-1 placeholder:text-xs"></input>
                        <div className="absolute right-3 top-0">
                            <IconButton sx={{ p: 0 }} onClick={() => setShowConfirmPassword(prev => !prev)}>
                                {showConfirmPassword ? <Visibility fontSize="small"/> : <VisibilityOff fontSize="small"/>}
                            </IconButton>
                        </div>
                    </div>
                </div>
                <Button
                onClick={() => handleRegister(name,email,password)}
                disabled={isLoading}
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
                    {isLoading ? <span>Creating</span> : <span>Create Account</span>}
                </Button>
            </div>
        </div>
        )
}