import { Dialog, DialogTitle, Button, DialogActions, DialogContent, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Edit } from "@mui/icons-material";
import { colors } from "../../data/colors";
import toast from "react-hot-toast";

function EditTeamModal({ open, onClose, closeOption, team, onEditTeam }) {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // update state whenever team changes
  useEffect(() => {
  if (open && team) {
    setTeamName(team.name || "");
    setDescription(team.description || "");
  }
  }, [open, team]);

  const handleUpdate = async() => {
    setIsLoading(true);
    try {
        await onEditTeam(teamName,description);
        closeOption();
        onClose();
        toast.success("Team edited successfully");
    } catch (error) {
        console.log("Error", error);
        toast.error("Failed to edit the team");
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      disableEscapeKeyDown
      PaperProps={{ sx: { borderRadius: 2, p: 1 } }}
    >
      <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}><Edit sx={{ fontSize: "16px",
        color: colors.darkOrange
      }}/>Edit team</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Team Name"
          variant="filled"
          size="small"
          value={teamName}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => setTeamName(e.target.value)}
          sx={{
            marginBottom: "10px",
            "& .MuiInputBase-input": { fontSize: "14px", color: "black" },
            "& .MuiInputLabel-root": { fontSize: "14px", color: "black" },
            "& .MuiFilledInput-root": {
              backgroundColor: "#f9f9f9",
              "&:before": { borderBottomColor: "gray" },
              "&:hover:before": { borderBottomColor: "black" },
              "&.Mui-focused:after": { borderBottomColor: "black" },
            },
          }}
        />
        <TextField
          fullWidth
          label="Description"
          variant="filled"
          size="small"
          value={description}
          multiline
          minRows={3}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            "& .MuiInputBase-input": { fontSize: "14px", color: "black" },
            "& .MuiInputLabel-root": { fontSize: "14px", color: "black" },
            "& .MuiFilledInput-root": {
              backgroundColor: "#f9f9f9",
              "&:before": { borderBottomColor: "gray" },
              "&:hover:before": { borderBottomColor: "black" },
              "&.Mui-focused:after": { borderBottomColor: "black" },
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          variant="contained"
          sx={{
            fontSize: "12px",
            backgroundColor: colors.darkOrange,
            textTransform: "none",
            marginRight: "14px",
          }}
        >
          {isLoading ? "Editing" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTeamModal;
