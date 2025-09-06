import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DeleteTeamModal from "../features/team/DeleteTeamModal";

function TeamsOptionsMenu({ open, anchorEl, onClose, team }) {
    const [isDeleteOpen, SetIsDeleteOpen] = useState(false);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: 2, minWidth: 130 },
      }}
    >
      <MenuItem 
      onClick={() => { console.log("Editing teamId", team._id); onClose(); }}
      sx={{fontSize: "14px", padding: "2px 16px", minHeight: "unset"}}
      >
        <Edit sx={{ mr: 1, fontSize: "14px" }} /> Edit
      </MenuItem>
      <MenuItem 
      onClick={() => SetIsDeleteOpen(true)}
      sx={{fontSize: "14px", padding: "2px 16px", minHeight: "unset"}}
      >
        <Delete sx={{ mr: 1, fontSize: "14px"}} /> Delete
      </MenuItem>
      <DeleteTeamModal open={isDeleteOpen} onClose={() => SetIsDeleteOpen(false)} team={team}/>
    </Menu>
  );
}

export default TeamsOptionsMenu;
