import { useState, useEffect } from "react";
import { Paper, List, ListItem, ListItemText, Typography, IconButton, Button, Divider, Icon, Tooltip } from "@mui/material";
import { MarkEmailRead,History, MarkEmailUnread } from "@mui/icons-material";
import { NotificationsSkeleton } from "../skeleton/NotificationsSkeleton";
import formatCommentDate from "../../utils/formatCommentDate";
import { formatNotificationTime } from "../../utils/formatNotificationTime";

export default function Notifications({ className = "", data = [], isLoading, onRead, onReadAll, setFilter, filter }) {
  const [notifications, setNotifications] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  // Sync notifications when API data updates
  useEffect(() => {
    if (data) setNotifications(data);
  }, [data]);

  // Calculate if there are more notifications to show
  const isMore = notifications.length > visibleCount;

  // Slice notifications dynamically
  const visibleNotifications = notifications.slice(0, visibleCount);

  // Load more notifications
  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

  if (isLoading) {
    return (
      <Paper
        elevation={3}
        sx={{ p: 1, maxHeight: 350 }}
        className={`w-[300px] md:w-[300px] ${className}`}
      >
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          Notifications
        </Typography>
        <NotificationsSkeleton />
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{ p: 1, overflowY: "hidden", maxHeight: 320,  }}
      className={`w-[400px] md:w-[400px] ${className}`}
    >
      <div className="flex gap-1">
        <Typography variant="subtitle1" sx={{fontWeight: 600}}>
          Notifications
        </Typography>
        <Tooltip title="All">
          <IconButton
          onClick={() => setFilter("all")}
          sx={{ paddingY: 0,paddingX: 0.3, mb: 0.5, bgcolor: filter === "all" ? 'grey.300' : 'background.paper' }}>
            <History fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Unread">
          <IconButton
          onClick={() => setFilter("unread")}
          sx={{ paddingY: 0,paddingX: 0.3, mb: 0.5, bgcolor: filter === "unread" ? 'grey.300' : 'background.paper' }}>
            <MarkEmailUnread fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
      <Divider />
      <div className="flex w-full justify-end">
        {!notifications.every(n => n.isRead) && (
          <Button
            size="small"
            onClick={onReadAll}
            sx={{ fontSize: "11px", textTransform: "none", color: "black"}}
          >
            Mark All as Read
          </Button>
        )}
      </div>
      <List sx={{ maxHeight: 250, overflowY: "auto"}}>
        {
          notifications.length === 0 ? (
            <Typography variant="h8" sx={{color: "text.secondary" }}>
              No Notifications right now.
            </Typography>
          ) : (
            visibleNotifications.map((notif) => (
              <ListItem
                key={notif._id}
                sx={{
                  mb: 1,
                  backgroundColor: notif.isRead ? "#f5f5f5" : "#f7f7f7",
                  borderRadius: 1,
                  position: "relative",
                  pt: 2
                }}
                secondaryAction={
                    !notif.isRead ? (
                      <IconButton
                        edge="end"
                        aria-label="mark as read"
                        size="small"
                        onClick={() => onRead(notif._id)}
                      >
                        <MarkEmailRead fontSize="small" />
                      </IconButton>
                    ) : null
                  }
              >
                <ListItemText
                  primary={notif.description}
                  primaryTypographyProps={{
                    fontSize: "12px",
                  }}
                />
                <span className="absolute top-1 right-2 text-xs text-gray-600">{formatNotificationTime(notif.createdAt)}</span>
              </ListItem>
            ))
          )
        }
        {isMore && (
        <div className="flex justify-center">
          <Button
            onClick={handleLoadMore}
            sx={{ fontSize: "12px", textTransform: "none", color: "gray", paddingY: 0, px: 1 }}
          >
            Load more...
          </Button>
        </div>
      )}
      </List>
    </Paper>
  );
}
