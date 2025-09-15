import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import DeleteTeamModal from "../../features/team/DeleteTeamModal.jsx";
import EditTeamModal from "../../features/team/EditTeamModal.jsx";
import DetailsTeamModal from "../../features/team/DetailsTeamModal.jsx";
import { getUserRole } from "../../hooks/useUserRole.js";

function TeamsOptionsMenu({ open, anchorEl, onClose, team, setTeams, onDeleteTeam, onEditTeam }) {
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
        (role === "Leader" || role === "Admin") && (
          <MenuItem
            onClick={() => setIsEditOpen(true)}
            sx={{ fontSize: "14px", padding: "2px 16px", minHeight: "unset" }}
          >
            <Edit sx={{ mr: 1, fontSize: "14px" }} /> Edit
          </MenuItem>
        )
      }
      {
        role === "Leader" && (
          <MenuItem
            onClick={() => SetIsDeleteOpen(true)}
            sx={{ fontSize: "14px", padding: "2px 16px", minHeight: "unset" }}
          >
            <Delete sx={{ mr: 1, fontSize: "14px" }} /> Delete
          </MenuItem>
        )
      }
      <EditTeamModal open={isEditOpen} closeOption={onClose} 
      onEditTeam={(teamName,teamDescription) => onEditTeam({teamId:team._id,teamName,teamDescription})}
       onClose={() => setIsEditOpen(false)} setTeams={setTeams} team={team}/>
      <DeleteTeamModal open={isDeleteOpen} closeOption={onClose} onDeleteTeam={() => onDeleteTeam({teamId:team._id})}
       onClose={() => SetIsDeleteOpen(false)}/>
    </Menu>
  );
}

export default TeamsOptionsMenu;
