import { Box, Skeleton } from "@mui/material";

export default function TeamInboxSkeleton() {
  return (
    <section className="flex flex-col w-full py-4 px-4">
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 2,
      }}
    >
      <div className="flex items-center gap-0.5">
        <Box sx={{ display: "flex", gap: 0.5 }}>
            <Skeleton variant="rectangular" sx={{ borderRadius: 2, width: 72, height: 30 }} />
        </Box>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton variant="circular" sx={{ width: 20, height: 20}} />
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Skeleton variant="rectangular" sx={{ width: 325, height:40, borderRadius: 8 }}/>
        </Box>
      </div>
    </Box>
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
            bgcolor: "background.paper",
          }}
        >
          <Skeleton variant="circular" width={32} height={32} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" sx={{ width: "70%", height: 18 }} />
            <Skeleton variant="text" sx={{ width: "50%", height: 16 }} />
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Skeleton variant="circular" width={12} height={12} />
              <Skeleton variant="text" sx={{ width: 100, height: 14 }} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
    </section>
  );
}
