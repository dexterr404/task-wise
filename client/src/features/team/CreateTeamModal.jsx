import { Dialog, DialogTitle, Button, DialogActions, DialogContent, TextField} from "@mui/material";
import { useState } from "react";
import { Groups } from "@mui/icons-material";
import { colors } from "../../data/colors";
import toast from "react-hot-toast";


function CreateTeamModal({ open, onClose, onAddTeam, teams, user }) {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTeam = async() => {
    if (user?.subscription?.plan === "free" && teams.length >= 3) {
      return toast.error("Free plan allows up to 3 teams. Upgrade to Pro for more.");
    }

    if (!teamName.trim() || !description.trim()){
        return toast.error("Please enter all the fields");
    }
    setIsLoading(true);
    try {
        await onAddTeam({teamName,description});
        toast.success("Team successfully created");
        setTeamName("");
        setDescription("");
        onClose();
    } catch (error) {
        console.log(error);
        toast.error("Failed to create team");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2, p: 1 } }}
    >
      <DialogTitle variant="h8" sx={{ display: "flex", gap: 0.5, fontSize: "16px"}}>
        <Groups sx={{ color: colors.darkGreen}}/>Create team
      </DialogTitle>

      <DialogContent>
        <TextField
        autoFocus
        fullWidth
        label="Team Name"
        variant="filled"
        size="small"
        sx={{
            marginBottom: "10px",
            "& .MuiInputBase-input": {
            fontSize: "14px",
            color: "black"
            },
            "& .MuiInputLabel-root": {
            fontSize: "14px",
            color: "black"
            },
            "& .MuiFilledInput-root": {
            backgroundColor: "#f9f9f9",
            "&:before": {
                borderBottomColor: "gray",
            },
            "&:hover:before": {
                borderBottomColor: "black",
            },
            "&.Mui-focused:after": {
                borderBottomColor: "black",
            },
            },
        }}
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        />
        <TextField
        autoFocus
        fullWidth
        label="Description"
        variant="filled"
        size="small"
        value={description}
        multiline
        minRows={3}
        onChange={(e) => setDescription(e.target.value)}
        sx={{
            "& .MuiInputBase-input": {
            fontSize: "14px",
            color: "black"
            },
            "& .MuiInputLabel-root": {
            fontSize: "14px",
            color: "black",
            },
            "& .MuiFilledInput-root": {
            backgroundColor: "#f9f9f9",
            "&:before": {
                borderBottomColor: "gray",
            },
            "&:hover:before": {
                borderBottomColor: "black",
            },
            "&.Mui-focused:after": {
                borderBottomColor: "black",
            },
            },
        }}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button onClick={onClose} sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
          Cancel
        </Button>
        <Button
          onClick={handleCreateTeam}
          disabled={isLoading || (user?.subscription?.plan === "free" && teams.length >= 3)}
          variant="contained"
          sx={{ fontSize: "12px", backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#388E3C" }, textTransform: "none", marginRight: "14px" }}
        >
          {isLoading ? "Creating" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTeamModal;
