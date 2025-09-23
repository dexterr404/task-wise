import { Box, Skeleton } from "@mui/material";

export default function TeamTaskSkeleton() {
  return (
    <section className="flex flex-col w-full">
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 0.5 }}>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" sx={{ borderRadius: 2, width: 62, height: 30 }} />
        ))}
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginRight: 1 }}>
        <Skeleton variant="rectangular" sx={{ width: 225, height:40, borderRadius: 8 }}/>
      </Box>
    </Box>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 2,
        width: "100%",
        height: "100%",
      }}
    >
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Skeleton variant="text" sx={{ width: "100%", height: 40 }} />
          <Skeleton variant="rectangular" sx={{ width: "100%", flex: 1 }} />
        </Box>
      ))}
    </Box>
    </section>
  );
}
