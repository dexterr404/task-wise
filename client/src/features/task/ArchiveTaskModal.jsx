import {useState} from "react";
import { Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Divider } from "@mui/material";
import { toast } from "react-hot-toast"
import { colors } from "../../data/colors";
import { Archive } from "@mui/icons-material";

function ArchiveTaskModal({open,onClose,onArchive}) {
    const [isLoading,setIsLoading] = useState(false);

    const handleArchive = async() => {
        setIsLoading(true);
        try {
            await onArchive();
            toast.success("Task successfully archived");
            onClose();
        } catch (error) {
            toast.error("Failed to archive task");
            console.log("Error archiving the task", error);
        } finally {
            setIsLoading(false);
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
            sx: { borderRadius: 2, p: 1 },
            }}
        >
            <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
            <Archive sx={{ color: colors.darkOrange }}/>Do you really want to archive this task?
            </DialogTitle>
            <Divider />
            <DialogContent>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                This task will be archived. You can recover it anytime.
            </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "flex-end"}}>
            <Button
                onClick={onClose}
                sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
            >
                Cancel
            </Button>  
            <Button
            variant="contained"
                sx={{ fontSize: "12px", backgroundColor: colors.orange, "&:hover": { backgroundColor: colors.darkOrange }, textTransform: "none", marginRight: "14px" }}
                onClick={handleArchive}
                disabled={isLoading}
            >
                { isLoading ? <span className="text-white">Archiving</span> : <span>Archive</span>}
            </Button>
            </DialogActions>
        </Dialog>
     </>
    );
}

export default ArchiveTaskModal