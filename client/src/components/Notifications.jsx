import React, { useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Notifications({ className = "" }) {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Task: Schedule me an appointment is nearing its deadline!", type: "warning" },
    { id: 2, message: "New comment on your task.", type: "info" },
    { id: 3, message: "Your profile was updated successfully.", type: "success" },
  ]);

  const getColor = (type) => {
    switch (type) {
      case "success":
        return "#4caf50";
      case "warning":
        return "#ff9800";
      case "error":
        return "#f44336";
      case "info":
      default:
        return "#2196f3";
    }
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 1, maxHeight: 350, overflowY: "auto" }}
      className={`w-[300px] md:w-[300px] ${className}`}
    >
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Notifications
      </Typography>
      <List>
        {notifications.map((notif) => (
          <ListItem
            key={notif.id}
            sx={{
              mb: 1,
              borderLeft: `5px solid ${getColor(notif.type)}`,
              backgroundColor: "#f5f5f5",
              borderRadius: 1,
            }}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                size="small"
                onClick={() => handleDelete(notif.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            }
          >
            <ListItemText
              primary={notif.message}
              primaryTypographyProps={{
                fontSize: "12px",
                fontWeight: 400,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
