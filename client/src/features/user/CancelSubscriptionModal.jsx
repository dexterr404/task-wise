import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Divider} from "@mui/material";
import { NotInterested, ReportProblemRounded } from "@mui/icons-material";
import { colors } from "../../data/colors.js";

function CancelSubscriptionModal({open,onClose,onCancel,isLoading}) {

  return (
    <>
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { bgcolor: "var(--color-surface)", color: "var(--color-text-secondary)", borderRadius: 2, p: 1 },
      }}
    >
      <DialogTitle sx={{ color: "var(--color-text-primary)", display: "flex", flexDirection: "row", alignItems: "center", gap: 1, py: 1, fontSize: 14 }}>
        <NotInterested sx={{ color: colors.darkerblue }}/>Are you sure you want to cancel your subscription?
      </DialogTitle>
      <Divider sx={{ borderColor: "var(--color-border)"}}/>
      <DialogContent >
        <Typography sx={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
          Your account will return to the Free Tier, and you’ll lose access to premium features.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end"}}>
          <Button onClick={onClose} sx={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-secondary)"}}>
            Back
          </Button>  
          <Button
            onClick={() => {
              onCancel();
              onClose();
            }}
            disabled={isLoading}
            variant="contained"
            sx={{ fontSize: "12px", backgroundColor: colors.lighterblue, "&:hover": { backgroundColor: colors.darkerblue }, textTransform: "none", marginRight: "14px" }}
            >
            {isLoading ? "Processing" : "Continue"}
          </Button>
        </DialogActions>
    </Dialog>
    </>
  );
}

export default CancelSubscriptionModal;
