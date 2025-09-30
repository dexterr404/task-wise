import { Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Divider } from "@mui/material";
import { colors } from "../../data/colors";
import { Unarchive } from "@mui/icons-material";
import { useState } from "react";

function UnarchiveTaskModal({open,onClose,onUnArchiveTask}) {
    const [loading,setLoading] = useState(false);

    const handleUnarchive = async() => {
        setLoading(true);
        try {
            await onUnArchiveTask();
            onClose();
        } catch (error) {
            console.log("Error Unarchiving the task", error);
        } finally {
            setLoading(false);
        }
    }

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
            <DialogTitle variant="h8" sx={{ color: "var(--color-text-primary)", display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
            <Unarchive sx={{ color: colors.darkGreen }}/>Do you really want to unarchive this task?
            </DialogTitle>
            <Divider sx={{ borderColor: "var(--color-border)"}}/>
            <DialogContent>
            <Typography sx={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
                This task will be restored to your board and can be managed like any other active task.
            </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "flex-end"}}>
            <Button
                onClick={onClose}
                sx={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-secondary)"}}
            >
                Cancel
            </Button>  
            <Button
            variant="contained"
                sx={{ fontSize: "12px", backgroundColor: colors.green, "&:hover": { backgroundColor: colors.darkGreen }, textTransform: "none", marginRight: "14px" }}
                onClick={handleUnarchive}
                disabled={loading}
            >
                { loading ? <span className="text-white">Unarchiving</span> : <span>Unarchive</span>}
            </Button>
            </DialogActions>
        </Dialog>
     </>
    );
}

export default UnarchiveTaskModal