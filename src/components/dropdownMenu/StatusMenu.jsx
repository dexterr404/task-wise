import { Menu, MenuItem } from "@mui/material";

function StatusMenu({ anchorEl, onClose, onSelect }) {
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          mt: 1,
          borderRadius: 2,
          boxShadow: 3,
          "& .MuiMenuItem-root": {
            fontSize: "12px",
            px: 1.5,
            py: 0.5
          }
        },
      }}
    >
      <MenuItem
        onClick={() => {
          onSelect("Done");
          onClose();
        }}
      >
        Done
      </MenuItem>
      <MenuItem
        onClick={() => {
          onSelect("Ongoing");
          onClose();
        }}
      >
        Ongoing
      </MenuItem>
      <MenuItem
        onClick={() => {
          onSelect("Unfinished");
          onClose();
        }}
      >
        Unfinished
      </MenuItem>
    </Menu>
  );
}

export default StatusMenu;
