import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

export default function ProfileMenu({ className = "" }) {
  const handleMenuItemClick = (action) => {
    console.log(action);
  };

  return (
    <Paper className={className} sx={{ "& *": { fontSize: "13px" } }}>
      <MenuList>
        <MenuItem onClick={() => handleMenuItemClick("Profile")}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("My account")}>
          My account
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Logout")}>
          Logout
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
