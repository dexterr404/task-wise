import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../api/authService";
import { loginSuccess } from "./authSlice";
import { addUser } from "../user/userSlice";

export function SuccessRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user); // read from Redux

  useEffect(() => {
    const handleAuth = async () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");
      const provider = urlParams.get("provider");
      const redirect = urlParams.get("redirect");
      const safeRedirect =
        redirect && redirect !== "null" && redirect !== "undefined"
          ? redirect
          : null;

      // If token missing, redirect to login
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      // Store token & provider
      localStorage.setItem("token", token);
      if (provider) localStorage.setItem("auth_provider", provider);

      try {
        let currentUser = user;

        // If Redux is empty, fetch the user from API
        if (!currentUser || !currentUser.id) {
          currentUser = await getCurrentUser();

          dispatch(loginSuccess({ token:token }));
          dispatch(
            addUser({
              id: currentUser._id,
              name: currentUser.name,
              email: currentUser.email,
              profileImage: currentUser.profileImage,
              focus: currentUser.focus,
              insights: currentUser.insights,
            })
          );
          localStorage.setItem("user", JSON.stringify({
              id: currentUser._id,
              name: currentUser.name,
              email: currentUser.email,
              profileImage: currentUser.profileImage,
              focus: currentUser.focus,
              insights: currentUser.insights,
            }));
        }

        navigate(safeRedirect || `/dashboard`, { replace: true });
      } catch (error) {
        console.error(error);
        navigate("/login", { replace: true });
      }
    };

    handleAuth();
  }, [location.search, navigate, dispatch, user]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Signing you in...</p>
    </div>
  );
}
