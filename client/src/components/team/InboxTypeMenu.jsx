import { HelpOutline } from "@mui/icons-material";
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";

export function InboxTypeMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <HelpOutline sx={{ fontSize: 18, color: "text.secondary" }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: 2, minWidth: 180,marginTop: 1},
        }}
      >
        <Typography
          sx={{
            px: 1.5,
            py: 1,
            fontSize: 13,
            fontWeight: 600,
            color: "text.secondary",
          }}
        >
          Inbox Color Guide
        </Typography>
        <Divider />

        <MenuItem
          sx={{ fontSize: "13px", padding: "2px 12px", minHeight: "unset" }}
        >
          <div className="w-3 h-3 bg-blue-700 rounded-full mr-1" />
          Task updates
        </MenuItem>

        <MenuItem
          sx={{ fontSize: "13px", padding: "2px 12px", minHeight: "unset" }}
        >
          <div className="w-3 h-3 bg-green-700 rounded-full mr-1" />
          Member activity
        </MenuItem>

        <MenuItem
          sx={{ fontSize: "13px", padding: "2px 12px", minHeight: "unset" }}
        >
          <div className="w-3 h-3 bg-orange-700 rounded-full mr-1" />
          Team updates
        </MenuItem>
      </Menu>
    </>
  );
}

export default InboxTypeMenu;
