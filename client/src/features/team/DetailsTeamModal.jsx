import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography,Avatar,AvatarGroup,Divider} from "@mui/material";
import { Info } from "@mui/icons-material";
import { colors } from "../../data/colors";

export function DetailsTeamModal({ open, onClose, team }) {
  if (!team) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, p: 1},
      }}
    >
      <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <Info sx={{ color: colors.lighterblue, fontSize: "16px" }}/>Team Details
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Team Name */}
        <div>
          <Typography sx={{ color: "text.primary", fontSize: 13 }}>
            Name:
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 13 }}>{team.name}</Typography>
        </div>

        {/* Owner */}
        <div className="flex items-center justify-start gap-10 max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <div className="flex items-center gap-1">
            <Avatar
              alt={team.owner.name}
              src={team.owner.profileImage}
              sx={{ width: 32, height: 32 }}
            />
            <div className="flex flex-col">
              <Typography sx={{ color: "text.primary", fontSize: 13 }}>
                Leader:
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: 13 }}>{team.owner.email}</Typography>
            </div>
          </div>

          {/* Members */}
          <div className="flex gap-2">
            <AvatarGroup max={4}>
              {team.members.map((member) => 
                member.role !== "Leader" ? (
                  <Avatar
                    key={member.user._id}
                    alt={member.user.name}
                    src={member.user.profileImage}
                    sx={{
                      width: 32,
                      height: 32,
                      marginLeft: '-14px',
                      border: '2px solid white'
                    }}
                  />
                ) : null
              )}
            </AvatarGroup>
            <div>
              <Typography sx={{ color: "text.primary", fontSize: 13 }}>
                Members:
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                {team.members.length-1} {team.members.length === 1 ? "member" : "members"}
              </Typography>
            </div>
          </div>
        </div>

        {/* Description */}
        {team.description && (
          <div>
            <Typography sx={{ color: "text.primary", fontSize: 13 }}>
              Description:
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
              {team.description}
            </Typography>
          </div>
        )}

        {/* Date Created */}
        <div>
            <Typography sx={{ color: "text.primary", fontSize: 13 }}>
              Date Created:
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
              {new Date(team.createdAt).toLocaleString()}
            </Typography>
        </div>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailsTeamModal;