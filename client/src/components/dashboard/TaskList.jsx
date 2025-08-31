import { Button, Box, Typography, Divider } from "@mui/material";

function TaskList() {
  return (
    <div className="w-full md:w-1/2 lg:w-full bg-white shadow-xl rounded-lg p-8">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          Tasks
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontSize: 12,
            bgcolor: "success.main",
            color: "white",
            py: 0.5,
            px: 2,
            textTransform: "none",
            "&:hover": {
              bgcolor: "success.dark",
            },
          }}
        >
          + New
        </Button>
      </Box>
      <Divider />

      <Box display="flex" flexDirection="column" gap={1}>
        <Box>
          <Typography variant="subtitle2">Get a passport</Typography>
          <Typography variant="caption" color="text.secondary">
            Due date: September 5, 2025
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2">Complete React project</Typography>
          <Typography variant="caption" color="text.secondary">
            Due date: September 10, 2025
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2">Complete React project</Typography>
          <Typography variant="caption" color="text.secondary">
            Due date: September 10, 2025
          </Typography>
        </Box>

      </Box>
    </div>
  );
}

export default TaskList;
