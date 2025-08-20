import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";

function UpdateSubtaskModal({open,onClose,task}) {
  const statusColors = {
    Done: "bg-green-700",
    Ongoing: "bg-yellow-600",
    Pending: "bg-gray-700",
    Unfinished: "bg-red-700"
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, p: 1 },
      }}
    >
      <DialogTitle component="div">
      <Typography variant="subtitle1" fontWeight={600}>
        Upate subtasks status here
      </Typography>
      <div className="flex flex-col justify-around text-sm gap-1 mt-3">
          {
            task.subtasks.map((t,index) => (
              <div key={index} className="flex justify-between items-center border-b-1 pb-1 border-b-gray-200">
                <div className="flex items-center gap-1">
                  <div className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                    {index+1}
                  </div>
                  {t.title}
                </div>
                <div className={`cursor-pointer px-2 text-white py-1 rounded-md text-xs hover:opacity-90 active:opacity-70
                  ${statusColors[t.status]}`}>
                  {t.status}
                </div>
              </div>
            ))
          }
        </div>
      </DialogTitle>

      <DialogContent />

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "grey",
            color: "white",
            "&:hover": { opacity: 0.8, backgroundColor: "grey" },
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: "red",
            color: "white",
            ml: 1,
            "&:hover": { opacity: 0.8, backgroundColor: "red" },
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateSubtaskModal;
