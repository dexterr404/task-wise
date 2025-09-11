import { useState } from "react";
import { useSelector } from "react-redux";
import { IconButton,Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notifications from "./Notifications";
import ProfileMenu from "../dropdownMenu/ProfileMenu";
import CloseIcon from "@mui/icons-material/Close";
import defaultImage from "../../assets/Default Profiles/gamer.png"

function ProfileAndNotif({setProfileMenuOpen, isProfileMenuOpen }) {
  const user = useSelector((state) => state.user);

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <div className="flex gap-3 items-center">
      {/* Notifications */}
      <div className="relative">
        <Tooltip title="Notifications">
          <NotificationsIcon
            className="cursor-pointer"
            onClick={() => setIsNotifOpen((prev) => !prev)}
        />
        </Tooltip>
        <div className="bg-red-500 rounded-full text-white flex justify-center items-center text-xs w-4 h-4 absolute -top-1 -right-1">
            3
        </div>
        </div>

        {isNotifOpen && (
        <div className="fixed right-4 top-17 z-50 max-md:left-0 max-md:right-0 max-md:w-screen max-md:px-2 shadow-md">
            <div className="absolute top-1 right-2">
              <IconButton
              size="small"
              onClick={() => setIsNotifOpen(false)}
              sx={{
                color: "gray",
                "&:hover": { color: "red" }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            </div>
            <div className="max-h-80 overflow-y-auto"> 
                <Notifications className="w-full" />
            </div>
        </div>
        )}
      {/* Profile */}
      <div className="relative">
        <Tooltip title="Profile">
          <img
          src={user.profileImage || defaultImage}
          className="w-10 h-10 rounded-full cursor-pointer object-cover"
          onClick={() => {
            setProfileMenuOpen((prev) => !prev);
          }}
        />
        </Tooltip>
        {isProfileMenuOpen && (
          <div className="absolute top-full right-0 mt-2 z-100">
            <ProfileMenu/>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileAndNotif;
