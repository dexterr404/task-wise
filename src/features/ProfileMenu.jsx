import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

export default function ProfileMenu({ className = "" }) {
  const handleMenuItemClick = (action) => {
    console.log(action);
  };

  return (
    <Stack direction="row" spacing={2} className={className}  sx={{
        "& *": { fontSize: "13px" }
    }}>
      <Paper>
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
    </Stack>
  );
}
