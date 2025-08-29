import { useState } from "react";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import EditProfileModal from "../../features/user/EditProfileModal";
import LogoutModal from "../../features/auth/LogoutModal";
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Logout from '@mui/icons-material/Logout';    

export default function ProfileMenu({ className = "",setTasks }) {
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <Paper className={className} sx={{ "& *": { fontSize: "14px" } }}>
      <MenuList>
        <MenuItem onClick={() => setIsProfileOpen(true)}>
          <ManageAccounts fontSize="medium"/><span className="ml-1">Profile</span>
        </MenuItem>
        <MenuItem onClick={() => setIsLogoutOpen(true)}>
          <Logout fontSize="medium"/><span className="ml-1">Logout</span>
        </MenuItem>
      </MenuList>
      <EditProfileModal
          open={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      <LogoutModal 
          open={isLogoutOpen}
          setTasks={setTasks}
          onClose={() => setIsLogoutOpen(false)}
      />
    </Paper>
  );
}
