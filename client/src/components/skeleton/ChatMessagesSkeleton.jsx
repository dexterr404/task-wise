import { Box, Skeleton } from "@mui/material";

export default function ChatMessageSkeleton({ count = 3 }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {[...Array(count)].map((_, index) => (
        <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
          {/* Profile Image Skeleton */}
          <Skeleton variant="circular" width={40} height={40} />

          {/* Message Bubble Skeleton */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}>
            <Skeleton variant="text" width="30%" height={16} />
            <Skeleton variant="rounded" width="100%" height={24} />
            <Skeleton variant="rounded" width="80%" height={24} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
