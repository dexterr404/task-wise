import { useState,useEffect } from "react";
import { Button,Dialog,DialogTitle,DialogContent,DialogActions,IconButton,Avatar,Typography, Divider } from "@mui/material";
import AssignedMembers from "./AssignedMembers";
import { Add, GroupAdd } from "@mui/icons-material";
import { colors } from "../../data/colors";
import toast from "react-hot-toast";

export function AssignTaskModal({open,onClose,team,task,handleEdit}) {
  const [isLoading,setIsLoading] = useState(false);
  const [assignedUsers,setAssignedUsers] = useState(task.assignedTo || []);

    useEffect(() => {
      setAssignedUsers(task.assignedTo || []);
    }, [task]);

    //Check if user is added already, if not add to assigned
    const addUser = (member) => {
    if (assignedUsers.some((u) => u._id === member._id)) return;
      setAssignedUsers((prev) => [...prev, member]);
    };
    
    //Remove user from assigned list
    const removeUser = (id) => {
      setAssignedUsers((prev) => prev.filter((u) => u._id !== id));
    };

    const handleSave = async() => {
      setIsLoading(true);
      try {
        await handleEdit({assignedTo: assignedUsers});
        if(assignedUsers.length === 1) {
          toast.success(`${assignedUsers[0].name.split(" ")[0]} has been assigned to the task`);
        } else if(assignedUsers.length === 0) {
          toast.success("Removed assigned users");
        }
        else {
          toast.success(`${assignedUsers.length} people assigned to the task`)
        }
        onClose();
      } catch (error) {
        toast.error("Failed to assign task");
        console.log("Error assigning task:", error);
      } finally {
        setIsLoading(false);
      }
    }

    return (
    <>
      <Dialog open={open} fullWidth maxWidth={false} PaperProps={{
        sx: { borderRadius: 2, p: 1, width: "470px", maxWidth: "90%" },
      }}>
        <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}> 
          <GroupAdd sx={{ color: colors.darkGreen }} fontSize="small"/>Assign task</DialogTitle>
        <Divider />
        <DialogContent>
          {
            assignedUsers.length > 0 ? (
              <AssignedMembers assigned={assignedUsers} onRemove={removeUser} />
            ) : (
              <span className="flex justify-center text-xs text-gray-400 py-5">No team members assigned yet.</span>
            )
          }
           <Typography fontSize="small" sx={{marginTop: "4px"}}>
              Team Members
           </Typography>
          <div className="max-h-80 overflow-y-auto">
            {
              team.members.map((member) => (
                <div key={member._id} className="px-3 py-1 rounded-2xl text-xs flex gap-1 items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <Avatar
                      key={member.user._id}
                      alt={member.user.name}
                      src={member.user.profileImage}
                      sx={{ width: 32, height: 32 }}
                    />
                    {member.user.name}
                  </div>
                    <IconButton onClick={() => addUser(member.user)}>
                      <Add fontSize="small"/>
                    </IconButton>
                </div>
              ))
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
          Cancel
          </Button>     
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isLoading}
            sx={{ fontSize: "12px", backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#388E3C" }, textTransform: "none", marginRight: "14px" }}
          >{
            isLoading ? <div className="text-white">Assigning</div> : <div>Done</div>
          }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AssignTaskModal