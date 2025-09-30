import { useState } from "react";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import EditProfileModal from "../../features/user/EditProfileModal";
import LogoutModal from "../../features/auth/LogoutModal";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import Logout from "@mui/icons-material/Logout";

export default function ProfileMenu({ className = "" }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <Paper
      className={className}
      sx={{
        bgcolor: "var(--color-surface)",
        py: 0.5,
        color: "var(--color-text-primary)",
        "& *": { fontSize: 14 },
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <MenuList disablePadding sx={{ "& .MuiMenuItem-root": { paddingTop: 0.5, paddingBottom: 0.5, minHeight: "unset" } }}>
        <MenuItem
          onClick={() => setIsProfileOpen(true)}
          sx={{
            gap: 1,
            px: 2,
            py: 1,
            "&:hover": {
              bgcolor: "var(--color-hover)",
            },
          }}
        >
          <ManageAccounts fontSize="small" />
          <span className="text-text-primary">Profile</span>
        </MenuItem>

        <MenuItem
          onClick={() => setIsLogoutOpen(true)}
          sx={{
            gap: 1,
            px: 2,
            py: 1,
            "&:hover": {
              bgcolor: "var(--color-hover)",
            },
          }}
        >
          <Logout fontSize="small" />
          <span className="text-text-primary">Logout</span>
        </MenuItem>
      </MenuList>

      {/* Modals */}
      <EditProfileModal
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <LogoutModal
        open={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </Paper>
  );
}
