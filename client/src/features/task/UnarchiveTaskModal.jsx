import {useState} from "react";
import { Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography } from "@mui/material";
import { toast } from "react-hot-toast"
import { colors } from "../../data/colors";
import { Unarchive } from "@mui/icons-material";

function UnarchiveTaskModal({open,onClose,onUnarchive}) {
    const [isLoading,setIsLoading] = useState(false);

    const handleUnarchive = async() => {
        setIsLoading(true);
        try {
            await onUnarchive();
            toast.success("Task successfully Unarchived");
            onClose();
        } catch (error) {
            toast.error("Failed to Unarchive task");
            console.log("Error Unarchiving the task", error);
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
            <Unarchive sx={{ color: colors.darkGreen }}/>Do you really want to unarchive this task?
            </DialogTitle>
            <DialogContent>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                This task will be restored to your board and can be managed like any other active task.
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
                sx={{ fontSize: "12px", backgroundColor: colors.green, "&:hover": { backgroundColor: colors.darkGreen }, textTransform: "none", marginRight: "14px" }}
                onClick={handleUnarchive}
                disabled={isLoading}
            >
                { isLoading ? <span className="text-white">Unarchiving</span> : <span>Unarchive</span>}
            </Button>
            </DialogActions>
        </Dialog>
     </>
    );
}

export default UnarchiveTaskModal