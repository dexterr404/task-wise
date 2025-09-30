import { Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,Divider } from "@mui/material";
import { useState } from "react";
import { Group, Link } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { sendTeamInviteEmail } from "../../api/teamService.js";
import { colors } from "../../data/colors.js"

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth 
    PaperProps={{
      sx: {
         bgcolor: "var(--color-surface)", color: "var(--color-text-secondary)"
      }
    }}>
      <DialogTitle sx={{ color: "var(--color-text-primary)", fontSize: "14px", display: "flex", flexDirection: "row", alignItems: "center",gap: 1}}>
      <Group fontSize="small" sx={{ color: colors.lighterblue}}/>
      Share with people
      </DialogTitle>
        <DialogContent>
          {/* Invite inputted email */}
          <div className="flex items-center gap-2 mb-4 pt-2">
            <TextField
              fullWidth
              size="small"
              label="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
              style: { fontSize: 13, color: "var(--color-text-secondary)" },
              }}
              InputLabelProps={{
                style: { fontSize: 13, color: "var(--color-text-primary)" },
              }}
              sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--color-border)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--color-text-secondary)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--color-text-primary)",
                },
              }}}
              />
            <Button
              variant="outlined"
              onClick={handleSendInvite}
              disabled={!email || isLoading}
              sx={{
                textTransform: "none",
                paddingY: "6px",
                fontSize: "12px",
                color: "var(--color-text-primary)",
                borderColor: "var(--color-border)",
                "&:hover": {
                  borderColor: "var(--color-text-primary)",
                  backgroundColor: "var(--color-surface)",
                },
                "&.Mui-disabled": {
                  color: "var(--color-border)",
                  borderColor: "var(--color-border)",
                },
              }}
            >
              Send
            </Button>
          </div>
          {/*Teams invite link*/}
          <TextField
            fullWidth
            size="small"
            value={inviteUrl}
            InputProps={{
              readOnly: true, // still selectable
              sx: {
                fontSize: 13,
                color: "var(--color-text-primary)",
                backgroundColor: "var(--color-surface)",
                cursor: "pointer",
                "& input": {
                  caretColor: "transparent",
                  userSelect: "all",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-border)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-border)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-border)",
                  boxShadow: "none",
                },
              },
            }}
          />
          {/*Copy invite link button*/}
          <Button
            variant="outlined"
            sx={{
              mt: 1,
              fontSize: "12px",
              paddingY: "2px",
              paddingX: "8px",
              color: "var(--color-text-primary)",
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-bg)",
              "&:hover": {
                borderColor: "var(--color-text-primary)",
                backgroundColor: "var(--color-surface)",
              },
              "&.Mui-disabled": {
                color: "var(--color-text-secondary)",
                borderColor: "var(--color-border)",
              },
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleCopyLink}
          >
            <Link sx={{ fontSize: "18px", marginRight: "4px", color: "var(--color-text-primary)" }} />
            Copy link
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
