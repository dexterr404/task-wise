import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography,Avatar,AvatarGroup} from "@mui/material";

export function DetailsTeamModal({ open, onClose, team }) {
  if (!team) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, p: 1},
      }}
    >
      <DialogTitle sx={{ fontSize: 16 }}>
        Team Details
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Team Name */}
        <div>
          <Typography variant="subtitle2" color="text.secondary">
            Name:
          </Typography>
          <Typography  variant="subtitle2" color="text.secondary">{team.name}</Typography>
        </div>

        {/* Owner */}
        <div className="flex items-center justify-start gap-10 max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <div className="flex items-center gap-2">
            <Avatar
              alt={team.owner.name}
              src={team.owner.profileImage}
              sx={{ width: 32, height: 32 }}
            />
            <div className="flex flex-col">
              <Typography variant="subtitle2" color="text.secondary">
                Owner:
              </Typography>
              <Typography  variant="subtitle2" color="text.secondary">{team.owner.name}</Typography>
            </div>
          </div>

          {/* Members */}
          <div className="flex gap-2">
            <AvatarGroup max={4}>
              {team.members.map((member) => (
                <Avatar
                  key={member.user._id}
                  alt={member.user.name}
                  src={member.user.profileImage}
                  sx={{ width: 32, height: 32, marginLeft: '-14px', border: '2px solid white' }}
                />
              ))}
            </AvatarGroup>
            <div>
              <Typography variant="subtitle2" color="text.secondary">
                Members:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {team.members.length} {team.members.length === 1 ? "member" : "members"}
              </Typography>
            </div>
          </div>
        </div>

        {/* Description */}
        {team.description && (
          <div>
            <Typography variant="subtitle2" color="text.secondary">
              Description:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {team.description}
            </Typography>
          </div>
        )}

        {/* Date Created */}
        <div>
          <Typography variant="subtitle2" color="text.secondary">
              Date Created:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(team.createdAt).toLocaleDateString()}
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