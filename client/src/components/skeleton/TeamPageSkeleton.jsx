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
        <div className="flex items-center gap-1 py-2 px-2">
            <Skeleton variant="cicular" sx={{ borderRadius: "100%", width: 27, height:27 }} />
            <Skeleton variant="text" sx={{ borderRadius: 2, width: 120, height: 40 }} />
        </div>
        <Skeleton variant="rectangular" sx={{ borderRadius: 2, width: 22, height: 22 }} />
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
        {/* Left side with 2 boxes */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              sx={{ borderRadius: 2, width: 62, height: 30 }}
            />
          ))}
        </Box>

        {/* Right side with 1 box */}
        <Skeleton variant="rectangular" sx={{ borderRadius: 2, width: 62, height: 30 }} />
      </Box>
    </section>
  );
}
