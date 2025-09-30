import { Box, Skeleton } from "@mui/material";

export default function TeamInboxSkeleton() {
  return (
    <section className="flex flex-col w-full py-4 px-4">
      {/* Header Skeleton */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 2,
          bgcolor: "var(--color-surface)",
          p: 1.5,
          borderRadius: 2,
        }}
      >
        <div className="flex items-center gap-0.5">
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Skeleton
              variant="rectangular"
              sx={{
                borderRadius: 2,
                width: 72,
                height: 30,
                bgcolor: "var(--color-border)",
                "&::after": {
                  background: "linear-gradient(90deg, transparent, var(--color-surface), transparent)",
                },
              }}
            />
          </Box>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton
            variant="circular"
            sx={{
              width: 20,
              height: 20,
              bgcolor: "var(--color-border)",
            }}
          />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: 325,
                height: 40,
                borderRadius: 2,
                bgcolor: "var(--color-border)",
              }}
            />
          </Box>
        </div>
      </Box>

      {/* List Skeleton */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              bgcolor: "var(--color-bg)",
            }}
          >
            <Skeleton
              variant="circular"
              sx={{
                width: 32,
                height: 32,
                bgcolor: "var(--color-border)",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton
                variant="text"
                sx={{ width: "70%", height: 18, bgcolor: "var(--color-border)" }}
              />
              <Skeleton
                variant="text"
                sx={{ width: "50%", height: 16, bgcolor: "var(--color-border)" }}
              />
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Skeleton
                  variant="circular"
                  sx={{ width: 12, height: 12, bgcolor: "var(--color-border)" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ width: 100, height: 14, bgcolor: "var(--color-border)" }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </section>
  );
}
