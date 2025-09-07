import { Dialog, DialogTitle, DialogContent, DialogActions, Skeleton } from "@mui/material";
import Background from "../../assets/Backgrounds/login_bg.jpg"

export default function InviteSkeleton() {
  return (
    <main
      className="relative h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Dialog
        open={true}
        PaperProps={{
          sx: {
            borderRadius: 3,
            px: 2,
            py: 1,
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
          },
        }}
        maxWidth="xs"
        fullWidth
      >
        {/* Title skeleton */}
        <DialogTitle>
          <Skeleton variant="text" width="70%" height={24} sx={{ mx: "auto" }} />
        </DialogTitle>

        <DialogContent>
          {/* Avatar placeholder */}
          <div className="flex justify-center mb-2">
            <Skeleton variant="circular" width={64} height={64} />
          </div>

          {/* Team name skeleton */}
          <Skeleton variant="text" width="50%" height={28} sx={{ mx: "auto", mb: 2 }} />

          {/* Members preview skeleton */}
          <div className="flex justify-center gap-2 my-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                variant="circular"
                width={32}
                height={32}
              />
            ))}
            <Skeleton variant="text" width={60} height={20} sx={{ ml: 1 }} />
          </div>
        </DialogContent>

        <DialogActions
          sx={{
            px: 2,
            pb: 2,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Skeleton variant="rectangular" width={80} height={32} />
          <Skeleton variant="rectangular" width={80} height={32} />
        </DialogActions>
      </Dialog>
    </main>
  );
}
