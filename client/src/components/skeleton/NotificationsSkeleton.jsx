import { Box, Skeleton, Paper } from "@mui/material";

export function NotificationsSkeleton({ className = "" }) {
  return (
    <Paper
      sx={{
        p: 1,
        maxHeight: 350,
        bgcolor: "var(--color-surface)",
      }}
      className={`w-[280px] md:w-[280px] ${className}`}
    >
      {/* Title skeleton */}
      <Skeleton
        variant="text"
        height={20}
        width="50%"
        sx={{ mb: 1, bgcolor: "var(--color-border)" }}
      />

      {/* Notification list skeletons */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            borderRadius: 1,
            bgcolor: "var(--color-bg)", // background adapts
            pl: 0.5,
            borderLeft: "5px solid var(--color-border)",
            height: 30,
          }}
        >
          <Skeleton
            variant="text"
            height={14}
            width="80%"
            sx={{ bgcolor: "var(--color-border)" }}
          />
        </Box>
      ))}
    </Paper>
  );
}
