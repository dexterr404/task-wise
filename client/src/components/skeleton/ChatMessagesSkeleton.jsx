import { Box, Skeleton } from "@mui/material";

export default function ChatMessageSkeleton({ count = 3 }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
      {[...Array(count)].map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          {/* Profile Avatar */}
          <Skeleton
            variant="circular"
            sx={{ width: 40, height: 40, bgcolor: "var(--color-border)" }}
          />

          {/* Message Bubbles */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
            {/* Sender name */}
            <Skeleton
              variant="text"
              sx={{ width: "30%", height: 16, bgcolor: "var(--color-border)" }}
            />
            {/* Messages with varied lengths */}
            <Skeleton
              variant="rectangular"
              sx={{
                width: "100%",
                height: 24,
                borderRadius: 2,
                bgcolor: "var(--color-border)",
              }}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                width: "80%",
                height: 24,
                borderRadius: 2,
                bgcolor: "var(--color-border)",
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
