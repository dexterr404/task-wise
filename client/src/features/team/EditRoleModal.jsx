import { useState } from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography,Avatar,AvatarGroup,Divider} from "@mui/material";
import { Work } from "@mui/icons-material";
import { colors } from "../../data/colors";
import toast from "react-hot-toast";

function EditRoleModal({open,onClose,onEditUser}) {
    const [isLoading, setIsLoading] = useState(false)

    const handleUpdateRole = async() => {
        setIsLoading(true);
        try {
            await onEditUser();
            toast.success("User role successfully changed");
            onClose();
        } catch (error) {
            console.log("Error chaning user role");
            toast.error("Failed to change role");
        } finally {
            setIsLoading(false);
        }
    }
    return(
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
        PaperProps={{
        sx: { borderRadius: 2, p: 1 },
        }} >
        <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
            <Work sx={{ color: colors.darkerblue }}/>Do you really update this user's role?
        </DialogTitle>
        <Divider />
        <DialogContent >
        <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
            Changing a member’s role will immediately update their permissions in this team. This action may affect what they can manage.
        </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-end"}}>
            <Button onClick={onClose} sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
                Cancel
            </Button>  
            <Button
            onClick={handleUpdateRole}
            disabled={isLoading}
            variant="contained"
            sx={{ fontSize: "12px", backgroundColor: colors.lighterblue, "&:hover": { backgroundColor: colors.darkerblue }, textTransform: "none", marginRight: "14px" }}
            >
             {isLoading ? "Updating" : "Update"}
            </Button>
        </DialogActions>
    </Dialog>
    )
}

export default EditRoleModal