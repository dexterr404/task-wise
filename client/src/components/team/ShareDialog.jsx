import { Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,Divider } from "@mui/material";
import { useState } from "react";
import { Group, Link } from "@mui/icons-material";
import toast from "react-hot-toast";
import { sendTeamInviteEmail } from "../../api/teamService.js";

function ShareDialog({ open, onClose, inviteToken,teamId }) {

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inviteUrl = `${import.meta.env.VITE_APP_URL}/teams/invite/${inviteToken}`;

  //Copy the invite link from the textfield
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    toast.success("Link copied!");
  };

  //Send the invite link to the selected email
  const handleSendInvite = async() => {
    if (!email) return;
    setIsLoading(true);
    try {
      const res = await sendTeamInviteEmail(teamId ,email);
      toast.success(res);
      setEmail("");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Failed to send invite email!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{fontSize: "14px",display: "flex",flexDirection: "row",alignItems: "center",gap: 1}}>
      <Group fontSize="small" />
      Share with people
      </DialogTitle>
        <DialogContent dividers>
          {/* Invite inputted email */}
          <div className="flex items-center gap-2 mb-4">
            <TextField
              fullWidth
              size="small"
              label="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                  sx: {
                  fontSize: "14px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                  paddingLeft: "8px",
                  minHeight: "28px",
                  },
              }}
              InputLabelProps={{
                  sx: {
                  fontSize: "14px",
                  top: "3px",
                  
                  },
              }}
              />
            <Button
              variant="outlined"
              onClick={handleSendInvite}
              disabled={!email || isLoading}
              sx={{textTransform: "none", paddingY: "6px", fontSize: "12px"}}
            >
              Send
            </Button>
          </div>
          {/*Teams invite link*/}
          <TextField
            fullWidth
            disabled={true}
            size="small"
            value={inviteUrl}
            InputProps={{ readOnly: true, sx: { fontSize: "14px", paddingTop: "0px", paddingBottom: "0px", paddingLeft: "8px" } }}
          />
          {/*Copy invite link button*/}
          <Button
            variant="outlined"
            sx={{ mt: 1, fontSize: "12px", paddingY: "2px", paddingX: "8px" }}
            onClick={handleCopyLink}>
            <Link sx={{fontSize: "18px", marginRight: "2px"}}/>Copy link
          </Button>
        </DialogContent>
        <DialogActions>
          <Button 
          variant="contained"
          sx={{fontSize: "12px", textTransform: "none", paddingY: "4px", paddingX: "8px", marginRight: "14px", marginTop: "2px", marginBottom: "2px"}}
          onClick={onClose}>Done</Button>
        </DialogActions>
    </Dialog>
  );
}

export default ShareDialog;
