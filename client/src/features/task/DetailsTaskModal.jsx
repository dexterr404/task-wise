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
import { colors } from "../../data/colors";

export function DetailsTaskModal({ open, onClose, task, team }) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, p: 1 },
      }}
    >
      <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <Info sx={{ color: "primary.main" }} fontSize="small"/>
        Task Details
      </DialogTitle>

      <Divider/>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1, py: 1 }}>
        {/* Title */}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography sx={{ color: "text.primary", fontSize: "13px" }}>
            Title:
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "13px" }}>
            {task.title}
          </Typography>
        </Box>
        {/* Assigned Users */}
        <Box sx={{display: "flex", alignItems: "center"}}>
          <Typography sx={{ color: "text.primary", fontSize: "13px" }}>Assigned to:</Typography>
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
          <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <Typography sx={{ color: "text.primary", fontSize: 13 }}>
              Created:
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
             {new Date(task.createdAt).toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <Typography sx={{ color: "text.primary", fontSize: 13 }}>
              Updated:
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
              {new Date(task.updatedAt).toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Typography sx={{ color: "text.primary", fontSize: 13 }}>
              Created by:
            </Typography>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <Avatar src={task.createdBy.profileImage} sx={{ width: 22, height: 22,marginLeft: 1}}/> 
              <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                {task.createdBy.name}
              </Typography>
            </Box>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end"}}>
        <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "white", backgroundColor: colors.lighterblue, "&:hover": { backgroundColor: colors.darkerblue } }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailsTaskModal;
