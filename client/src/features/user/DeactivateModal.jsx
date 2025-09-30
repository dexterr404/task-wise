import { Close, Warning } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography, TextField, DialogActions, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { colors } from "../../data/colors";

export function DeactivateModal({ open, onClose }) {
    const user = useSelector((state) => state.user);

    return<Dialog open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
       PaperProps={{
        sx: { borderRadius: 2, p: 1 },
      }}>
        <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
            <Warning fontSize="small" sx={{ color: colors.darkRed }} />Deactivate my account
        </DialogTitle>
        <IconButton
        onClick={() => onClose()}
        sx={{ position: "absolute", right: 3, top: 3}}
        >
            <Close fontSize="small"/>
        </IconButton>
        <Divider sx={{ borderColor: "var(--color-border)"}}/>
        <DialogContent>
            <Typography sx={{ color: "text.secondary", fontSize: 13,textIndent: 18, }}>
            Deactivating your account is permanent. All your data, tasks, and settings will be permanently deleted and cannot be recovered.
            </Typography>
            <Typography sx={{ fontSize: 13, mt: 2 }}>
            Please type "<strong>{user.name}</strong>" to confirm.
            </Typography>
            <TextField
            size="small"
            fullWidth
            sx={{ mt: 1 }}
            />
        </DialogContent>
        <DialogActions>
            <Button 
            variant="contained"
            sx={{ mr: 2, color: "white", fontSize: "12px", textTransform: "none", bgcolor: colors.red, "&:hover": { bgcolor: colors.darkRed} }}>
                Deactivate
            </Button>
        </DialogActions>
    </Dialog>
}