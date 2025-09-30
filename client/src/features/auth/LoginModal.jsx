import { useDispatch,useSelector } from "react-redux"
import { loginSuccess } from "./authSlice.js"
import { addUser } from "../user/userSlice.js"
import { loginUser } from "../../api/authService.js"

import { Button,IconButton } from "@mui/material";
import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Visibility,VisibilityOff } from "@mui/icons-material";
import  GoogleIcon  from "../../assets/google-icon.svg"
import TaskIcon from "../../assets/task-icon.png"
import { toast, Toaster } from "react-hot-toast";

function LoginModal() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const user = useSelector((state) => state.user);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogin = async (email, password) => {
        localStorage.removeItem("user");
    if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
    }

    setIsLoading(true);

    try {
        const data = await loginUser(email, password);

        dispatch(loginSuccess({ token: data.token }));
        dispatch(addUser({ id: data._id, name: data.name, email: data.email, profileImage: data.profileImage, focus: data.focus, insights: data.insights}));

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ id: data._id, name: data.name, email: data.email, profileImage: data.profileImage, focus: data.focus, insights: data.insights }));
    } catch (error) {
        console.log(error);
        if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        } else {
        toast.error("Login error");
        }
    } finally {
        setIsLoading(false);
    }
    };

    useEffect(() => {
        if (user && user.id) {
        const params = new URLSearchParams(location.search);
        const redirect = params.get("redirect");
        if (redirect) {
            navigate(redirect, { replace: true });
        } else {
            navigate(`/dashboard`, { replace: true });
        }
        }
    }, [user, navigate, location.search]);

    return (
    <div className="flex flex-col h-dvh items-center justify-center">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex flex-col bg-white max-sm:px-4 px-24 py-18 shadow-lg rounded-lg items-center gap-4">
            <div className="flex flex-col justify-center items-center mb-6">
                <img width="24" height="24" src={TaskIcon} alt="task-icon"/>
                <h1 className="text-2xl font-semibold">Let's Get Started</h1>
                <h6 className="text-sm">Ready to be wise in tasks? Please enter your details.</h6>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            disabled={isLoading}
            onClick={() => handleLogin(email, password)}
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
            {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <Button
            onClick={() => {
                const params = new URLSearchParams(location.search);
                const redirect = params.get("redirect");
                window.location.href=`${import.meta.env.VITE_API_URL2}/api/auth/google?redirect=${encodeURIComponent(redirect)}`
            }}
            variant="outlined"
            startIcon={<img src={GoogleIcon} alt="Google" style={{ width: 18, height: 18 }} />}
            sx={{ textTransform: "none", width: "100%",fontSize: "12px" }}>
            Sign in with Google
            </Button>
            <div className="text-sm flex gap-1 items-center">
                <span>Don't have an account yet?</span>
                <Link to='/register'>
                <span className="font-semibold cursor-pointer hover:opacity-80">Sign up</span>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default LoginModal