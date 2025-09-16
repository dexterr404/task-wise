import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
  Avatar,
  AvatarGroup,
  Divider,
  Tooltip,
  Box,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { getUserRole } from "../../hooks/useUserRole";

export function DetailsTaskModal({ open, onClose, task, team }) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <Info sx={{ color: "primary.main" }} fontSize="small"/>
        Task Details
      </DialogTitle>

      <Divider/>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Title */}
        <Box>
          <Typography sx={{ color: "text.primary", fontSize: "14px" }}>Title:</Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "13px" }}>{task.title}</Typography>
        </Box>

        {/* Assigned Users */}
        <Box>
          <Typography sx={{ color: "text.primary", fontSize: "14px" }}>Assigned to:</Typography>
          {task.assignedTo.length > 0 ? (
            <AvatarGroup sx={{ display: "flex", flexDirection: "row-reverse", justifyContent: "start",
              '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 11,backgroundColor: "gray", marginLeft: '-4px'}
            }}>
              {task.assignedTo.map((user) => (
                <Tooltip
                  key={user._id}
                  title={`${user.email} (${getUserRole(user, team)})`}
                  arrow
                >
                  <Avatar
                    src={user.profileImage}
                    sx={{ width: 32, height: 32, fontSize: 14 }}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          ) : (
            <Typography sx={{ color: "text.secondary", fontSize: "12px" }}>None</Typography>
          )}
        </Box>

        {/* Dates */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
            Created: {new Date(task.createdAt).toLocaleString()}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
            Updated: {new Date(task.updatedAt).toLocaleString()}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", mt: 1 }}>
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

export default DetailsTaskModal;
