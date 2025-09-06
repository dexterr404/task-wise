import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DeleteTeamModal from "../features/team/DeleteTeamModal";
import EditTeamModal from "../features/team/EditTeamModal";

function TeamsOptionsMenu({ open, anchorEl, onClose, team, setTeams }) {
    const [isDeleteOpen, SetIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

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
      onClick={() => setIsEditOpen(true)}
      sx={{fontSize: "14px", padding: "2px 16px", minHeight: "unset"}}
      >
        <Edit sx={{ mr: 1, fontSize: "14px" }} /> Edit
      </MenuItem>
      <EditTeamModal open={isEditOpen} closeOption={onClose} onClose={() => setIsEditOpen(false)} setTeams={setTeams} team={team}/>
      <MenuItem 
      onClick={() => SetIsDeleteOpen(true)}
      sx={{fontSize: "14px", padding: "2px 16px", minHeight: "unset"}}
      >
        <Delete sx={{ mr: 1, fontSize: "14px"}} /> Delete
      </MenuItem>
      <DeleteTeamModal open={isDeleteOpen} closeOption={onClose} onClose={() => SetIsDeleteOpen(false)} setTeams={setTeams} team={team}/>
    </Menu>
  );
}

export default TeamsOptionsMenu;
