import { Box, Skeleton } from "@mui/material";

export default function TeamPageSkeleton() {
  return (
    <section className="flex flex-col w-full mx-10 gap-4 lg:ml-[280px] pr-8">
      {/* Row 1 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1 }}>
          <Skeleton
            variant="circular"
            sx={{
              width: 27,
              height: 27,
              bgcolor: "var(--color-border)",
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              width: 120,
              height: 30,
              borderRadius: 2,
              bgcolor: "var(--color-border)",
            }}
          />
        </Box>
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: 2,
            width: 22,
            height: 22,
            bgcolor: "var(--color-border)",
          }}
        />
      </Box>

      {/* Row 2 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Left side with 3 buttons */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              sx={{
                borderRadius: 2,
                width: 62,
                height: 30,
                bgcolor: "var(--color-border)",
              }}
            />
          ))}
        </Box>

        {/* Right side button */}
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: 2,
            width: 62,
            height: 30,
            bgcolor: "var(--color-border)",
          }}
        />
      </Box>
    </section>
  );
}
