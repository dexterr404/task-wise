import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { getCurrentUser } from "../../api/authService";
import { loginSuccess } from "./authSlice";
import { addUser } from "../user/userSlice";

export function SuccessRedirect() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

 useEffect(() => {
    const handleAuth = async () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");
      const provider = urlParams.get("provider");
      const redirect = urlParams.get("redirect");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      // Store token & provider
      localStorage.setItem("token", token);
      if (provider) localStorage.setItem("auth_provider", provider);

      try {
        // Fetch current user
        const user = await getCurrentUser();

        // Store user in redux & localStorage
        dispatch(loginSuccess({ token }));
        dispatch(addUser({
          id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          focus: user.focus,
          insights: user.insights
        }));
        localStorage.setItem("user", JSON.stringify(user));

        // Navigate to redirect or dashboard
        navigate(redirect || `/dashboard/${user._id}`, { replace: true });
      } catch (error) {
        console.error(error);
        navigate("/login", { replace: true });
      }
    };

    handleAuth();
  }, [location.search, navigate, dispatch]);

  return <div className="flex items-center justify-center h-screen">
    <p>Signing you in...</p>
  </div>
}