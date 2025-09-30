import { useState, useEffect } from "react";
import { Paper, List, ListItem, ListItemText, Typography, IconButton, Button, Divider, Tooltip } from "@mui/material";
import { MarkEmailRead,History, MarkEmailUnread } from "@mui/icons-material";
import { NotificationsSkeleton } from "../skeleton/NotificationsSkeleton";
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
        sx={{ p: 1, maxHeight: 350, bgcolor: "var(--color-surface)" }}
        className={`w-[300px] md:w-[300px] ${className}`}
      >
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: "var(--color-text-primary)" }}>
          Notifications
        </Typography>
        <NotificationsSkeleton />
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{  bgcolor: "var(--color-surface)", color: "var(--color-text-secondary)", p: 1, overflowY: "hidden", maxHeight: 320}}
      className={`w-[400px] md:w-[400px] ${className}`}
    >
      <div className="flex gap-1">
        <Typography variant="subtitle1" sx={{fontWeight: 600, color: "var(--color-text-primary)"}}>
          Notifications
        </Typography>
        <Tooltip title="All">
          <IconButton
          onClick={() => setFilter("all")}
          sx={{ paddingY: 0,paddingX: 0.3, mb: 0.5, bgcolor: filter === "all" ? 'var(--color-accent)' : 'var(--color-surface)' }}>
            <History fontSize="small" sx={{ color: "var(--color-text-primary)" }}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Unread">
          <IconButton
          onClick={() => setFilter("unread")}
          sx={{ paddingY: 0,paddingX: 0.3, mb: 0.5, bgcolor: filter === "unread" ? 'var(--color-accent)' : 'var(--color-surface)' }}>
            <MarkEmailUnread fontSize="small" sx={{ color: "var(--color-text-primary)" }}/>
          </IconButton>
        </Tooltip>
      </div>
      <Divider sx={{ borderColor: "var(--color-text-primary)"}}/>
      <div className="flex w-full justify-end">
        {!notifications.every(n => n.isRead) && (
          <Button
            size="small"
            onClick={onReadAll}
            sx={{ fontSize: "11px", textTransform: "none", color: "var(--color-text-primary)"}}
          >
            Mark All as Read
          </Button>
        )}
      </div>
      <List sx={{ maxHeight: 250, overflowY: "auto", 
        "&::-webkit-scrollbar": {
        width: 6,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--color-border)",
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "var(--color-bg)",
        },

        scrollbarWidth: "thin",
        scrollbarColor: "var(--color-border) var(--color-bg)",
      }}>
        {
          notifications.length === 0 ? (
            <Typography variant="h8" sx={{ fontSize: 12, color: "var(--color-text-primary)" }}>
              No Notifications right now.
            </Typography>
          ) : (
            visibleNotifications.map((notif) => (
              <ListItem
                key={notif._id}
                sx={{
                  mb: 1,
                  backgroundColor: notif.isRead ? "var(--color-bg)" : "var(--color-border)",
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
                        <MarkEmailRead fontSize="small" sx={{ color: "var(--color-text-secondary)"}}/>
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
                <span className="absolute top-1 right-2 text-xs text-text-secondary">{formatNotificationTime(notif.createdAt)}</span>
              </ListItem>
            ))
          )
        }
        {isMore && (
        <div className="flex justify-center">
          <Button
            onClick={handleLoadMore}
            sx={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-primary)", paddingY: 0, px: 1 }}
          >
            Load more...
          </Button>
        </div>
      )}
      </List>
    </Paper>
  );
}
