import { Dialog, DialogTitle, Typography, Button, DialogActions, DialogContent, TextField, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { addTeam } from "../../api/teamService";
import toast from "react-hot-toast";

function CreateTeamModal({ open, onClose, setTeams, setSelectedTeam }) {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTeam = async() => {
    if (!teamName.trim() || !description.trim()){
        return toast.error("Please enter all the fields");
    }
    setIsLoading(true);
    try {
        const newTeam = await addTeam(teamName,description);
        setTeams((prev) => [...prev, newTeam]);
        setSelectedTeam(newTeam);
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
      <DialogTitle sx={{fontSize: "16px"}}>
        Create team
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
