import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import DeleteTeamModal from "../features/team/DeleteTeamModal";
import EditTeamModal from "../features/team/EditTeamModal";
import DetailsTeamModal from "../features/team/DetailsTeamModal";
import { getUserRole } from "../hooks/getUserRole.js";

function TeamsOptionsMenu({ open, anchorEl, onClose, team, setTeams }) {
    const user = useSelector((state) => state.user);
    const [isDeleteOpen, SetIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [role, setRole] = useState("guest");

    useEffect(() => {
      if (!team || !user) return;
      const newRole = getUserRole(user, team);
      setRole(newRole);
    }, [team, user ,setTeams]);

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
      onClick={() => setIsDetailsOpen(true)}
      sx={{fontSize: "14px", padding: "2px 16px", minHeight: "unset"}}
      >
        <Info sx={{ mr: 1, fontSize: "14px" }} /> Details
      </MenuItem>
      {
      team && (
        <DetailsTeamModal
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          team={team}
          closeOption={onClose}
        />
      )}
      {
        (role === "owner" || role === "admin") && (
          <MenuItem
            onClick={() => setIsEditOpen(true)}
            sx={{ fontSize: "14px", padding: "2px 16px", minHeight: "unset" }}
          >
            <Edit sx={{ mr: 1, fontSize: "14px" }} /> Edit
          </MenuItem>
        )
      }
      {
        role === "owner" && (
          <MenuItem
            onClick={() => SetIsDeleteOpen(true)}
            sx={{ fontSize: "14px", padding: "2px 16px", minHeight: "unset" }}
          >
            <Delete sx={{ mr: 1, fontSize: "14px" }} /> Delete
          </MenuItem>
        )
      }
      <EditTeamModal open={isEditOpen} closeOption={onClose} onClose={() => setIsEditOpen(false)} setTeams={setTeams} team={team}/>
      <DeleteTeamModal open={isDeleteOpen} closeOption={onClose} onClose={() => SetIsDeleteOpen(false)} setTeams={setTeams} team={team}/>
    </Menu>
  );
}

export default TeamsOptionsMenu;
