import { useState } from "react";
import { Table,TableHead,TableBody,TableRow,TableCell,Avatar,IconButton,Typography,Tooltip,Box,Select,MenuItem } from "@mui/material";
import { getUserRole } from "../../hooks/useUserRole";
import { Edit,Delete } from "@mui/icons-material";
import { useQueryClient,useMutation} from "@tanstack/react-query";
import { changeUserRole } from "../../api/teamService";

import RemoveUserModal from "../../features/team/RemoveUserModal";
import EditRoleModal from "../../features/team/EditRoleModal";
import { colors } from "../../data/colors";

export function TeamMembers({ team, onRemoveUser, role, accUser}) {
  const [removeUser, setRemoveUser] = useState(false);
  const [user, setUser] = useState(null);
  const [editedMemberId, setEditedMemberId] = useState(false);
  const [editedNewRole, setEditedNewRole] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isEditIndex, setIsEditIndex] = useState(null);

  const queryClient = useQueryClient();

  const changeUserMutation = useMutation({
    mutationFn: ({memberId,newRole}) =>
      changeUserRole(team._id,memberId,newRole),
    onSuccess: () => {
      queryClient.invalidateQueries('team', team._id)
    }
  });


  return (
  <section className="w-full overflow-x-auto">
    <Table size="small" className="min-w-[600px]">
      {/* ================== Table Header ================== */}
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2" color="var(--color-text-secondary)">
              Name
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" color="var(--color-text-secondary)">
              Email
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" color="var(--color-text-secondary)">
              Role
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="subtitle2" color="var(--color-text-secondary)">
              Actions
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>

      {/* ================== Table Body ================== */}
      <TableBody>
        {team.members.map((m, index) => {
          const userRole = getUserRole(m.user, team);
          const accRole = getUserRole(accUser, team);
          const isEditing = isEditIndex === index;

          return (
            <TableRow key={m._id}>
              {/* ---------- Name Cell ---------- */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tooltip title={m.user.name}>
                    <Avatar
                      src={m.user.profileImage}
                      alt={m.user.name}
                      sx={{ width: 32, height: 32 }}
                    />
                  </Tooltip>
                  <Typography variant="body2" fontWeight={500} color="var(--color-text-secondary)">
                    {m.user.name}
                  </Typography>
                </div>
              </TableCell>

              {/* ---------- Email Cell ---------- */}
              <TableCell>
                <Typography variant="body2" color="var(--color-text-secondary)">
                  {m.user.email}
                </Typography>
              </TableCell>

              {/* ---------- Role Cell ---------- */}
              <TableCell>
                {userRole === "Leader" ? (
                  // Leader role is fixed text
                  <Typography sx={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                    Leader
                  </Typography>
                ) : isEditing ? (
                  // Role dropdown (only if editing)
                  <Select
                    disabled={accRole === "Member" || accRole === "Admin"}
                    value={userRole}
                    size="small"
                    onChange={(e) => {
                      setIsEdit(true);
                      setEditedMemberId(m.user._id);
                      setEditedNewRole(e.target.value);
                    }}
                    sx={{
                      fontSize: 13,
                      minWidth: 80,
                      backgroundColor: "var(--color-surface)",
                      color: "var(--color-text-primary)",
                      "& .MuiSelect-icon": {
                        color: "var(--color-text-secondary)",
                      },
                      "& .MuiSelect-select": {
                        padding: "0px 24px 0px 8px", // inner select padding
                        color: "var(--color-text-primary)",
                        fontSize: 13,
                      },
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                    }}
                      MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "var(--color-surface)",
                          "& .MuiList-root": {
                            paddingTop: 0,
                            paddingBottom: 0,
                          },
                          "& .MuiMenuItem-root": {
                            fontSize: 13,
                            color: "var(--color-text-secondary)",
                            paddingY: 0.5,
                            "&:hover": {
                              backgroundColor: "var(--color-accent)",
                              color: "var(--color-text-primary)",
                            },
                            "&.Mui-selected": {
                              backgroundColor: "var(--color-border)",
                              color: "var(--color-text-primary)",
                            },
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem
                      value="Leader"
                      sx={{
                        fontSize: 13,
                        backgroundColor: "var(--color-surface)",
                        "&:hover": {
                          backgroundColor: "var(--color-border)",
                          color: "var(--color-text-primary)",
                        },
                        color: "var(--color-text-secondary)",
                        "&.Mui-selected": {
                          backgroundColor: "var(--color-accent)", // highlight when selected
                          color: "var(--color-text-primary)", // readable text in both modes
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "var(--color-border)", // hover effect on selected
                        },
                      }}
                    >
                      Leader
                    </MenuItem>

                    <MenuItem
                      value="Admin"
                      sx={{
                        fontSize: 13,
                        backgroundColor: "var(--color-surface)",
                        "&:hover": {
                          backgroundColor: "var(--color-border)",
                          color: "var(--color-text-primary)",
                        },
                        color: "var(--color-text-secondary)",
                        "&.Mui-selected": {
                          backgroundColor: "var(--color-accent)",
                          color: "var(--color-text-primary)",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "var(--color-border)",
                        },
                      }}
                    >
                      Admin
                    </MenuItem>

                    <MenuItem
                      value="Member"
                      sx={{
                        fontSize: 13,
                        backgroundColor: "var(--color-surface)",
                        "&:hover": {
                          backgroundColor: "var(--color-border)",
                          color: "var(--color-text-primary)",
                        },
                        color: "var(--color-text-secondary)",
                        "&.Mui-selected": {
                          backgroundColor: "var(--color-accent)",
                          color: "var(--color-text-primary)",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "var(--color-border)",
                        },
                      }}
                    >
                      Member
                    </MenuItem>
                  </Select>
                ) : (
                  // Default text (not editing)
                  <Typography sx={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                    {userRole}
                  </Typography>
                )}
              </TableCell>

              {/* ---------- Actions Cell ---------- */}
              <TableCell align="right">
                <Box display="flex" gap={1} justifyContent="flex-end" alignItems="center">
                  {/* Edit Button */}
                  <Tooltip
                    title={accRole !== "Leader" ? "Only the leader can edit" : ""}
                  >
                    <span>
                      <IconButton
                        disabled={userRole === "Leader" || accRole !== "Leader"}
                        onClick={() =>
                          setIsEditIndex((prev) => (prev === index ? null : index))
                        }
                        sx={{
                          color: "var(--color-text-secondary)",
                          "&:hover": { color: colors.darkerblue },
                          "&.Mui-disabled": {
                            color: "var(--color-border)",
                          },
                        }}
                        size="small"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>

                  {/* Delete Button */}
                  <Tooltip
                    title={
                      userRole === "Leader"
                        ? "You cannot remove the team Leader"
                        : accRole === "Member" && m.user._id !== accUser.id
                        ? "Not authorized"
                        : ""
                    }
                  >
                    <span>
                      <IconButton
                        disabled={
                          userRole === "Leader" || // Cannot remove Leader
                          (accRole === "Member" && m.user._id !== accUser.id) // Members can only remove themselves
                        }
                        onClick={() => {
                          setRemoveUser(true);
                          setUser(m.user);
                        }}
                        size="small"
                        sx={{
                          color: "var(--color-text-secondary)",
                          "&:hover": { color: colors.darkRed },
                          "&.Mui-disabled": {
                            color: "var(--color-border)",
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>

    {/* ================== Footer ================== */}
    <Typography
      variant="body2"
      color="var(--color-text-secondary)"
      sx={{ display: "flex", justifyContent: "center", paddingTop: "2px" }}
    >
      Nothing follows.
    </Typography>

    {/* ================== Modals ================== */}
    <RemoveUserModal
      open={removeUser}
      onClose={() => setRemoveUser(false)}
      onRemoveUser={() => onRemoveUser(user._id)}
      user={user}
      role={role}
    />

    <EditRoleModal
      open={isEdit}
      onClose={() => setIsEdit(false)}
      onEditUser={() =>
        changeUserMutation.mutateAsync({
          memberId: editedMemberId,
          newRole: editedNewRole,
        })
      }
      memberId={editedMemberId}
      newRole={editedNewRole}
    />
  </section>
);
}

export default TeamMembers;
