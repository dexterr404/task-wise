import { Box, Skeleton, Paper } from "@mui/material";

export function NotificationsSkeleton({ className = "" }) {
  return (
    <Paper
      sx={{ p: 1, maxHeight: 350 }}
      className={`w-[280px] md:w-[280px] ${className}`}
    >
      <Skeleton variant="text" height={20} width="50%" sx={{ mb: 1 }} />
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            borderRadius: 1,
            bgcolor: "#f5f5f5",
            pl: 0.5,
            borderLeft: "5px solid #ccc",
            height: 30,
          }}
        >
          <Skeleton variant="text" height={14} width="80%" />
        </Box>
      ))}
    </Paper>
  );
}
