import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Tooltip,} from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";
import toast from "react-hot-toast";
import { selectPendingTasks } from "../task/taskSlice";
import { updateFocus } from "../../api/userService";
import { addUser } from "./userSlice";

function SelectFocusModal({open,onClose,setFocusId}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFocus, setActiveFocus] = useState(user.focus || "");
  const [taskId, setTaskId] = useState("");

  const pendingTasks = useSelector(selectPendingTasks);

  useEffect(() => {
    if (user.focus) {
      setActiveFocus(user.focus);
    }
  }, [user.focus]);

  const handleFocusPick = (taskId) => {
  if (activeFocus === taskId) {
    setActiveFocus("");
    setTaskId("");
  } else {
    setActiveFocus(taskId);
    setTaskId(taskId);
  }
};
  

  const handleFocusChange = async(taskId) => {
    setIsLoading(true);
    try {
      await updateFocus(user.id,taskId || null);
      dispatch(addUser({ ...user, focus: taskId || null}));
      localStorage.setItem("user", JSON.stringify({ ...user, focus: taskId || null}));
      setFocusId(taskId || null);
      toast.success("Focus successfully changed");
      onClose();
    } catch (error) {
      toast.error("Failed to update focus");
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, paddingBottom: "4px" },
      }}
    >
      <DialogTitle component="div">
      <div className="flex items-center gap-1">
        <CenterFocusStrong fontSize="small"/> <div className="text-sm">Select Focus</div>
      </div>
      </DialogTitle>
      {
        pendingTasks.length === 0 ? (
          <DialogContent>
            <span>No tasks to focus on</span>
          </DialogContent>
        ) : (
           <DialogContent>
            <div className="flex flex-col gap-1">
              {
                pendingTasks.map((task) => (
                  <div 
                  key={task._id}
                  className="grid grid-cols-[7fr_1fr_1fr] py-2 px-2 gap-1 rounded-xl hover:shadow-lg transition-shadow shadow-md place-items-center text-sm text-left">
                    <div className="break-words place-self-start pl-3 w-full overflow-hidden pr-1">
                      {task.title}
                    </div>
                    <div className="text-sm font-semibold">
                      {new Date(task.deadline).toLocaleDateString()}
                    </div>
                    <Tooltip title="Focus">
                      <Button 
                      onClick={() => handleFocusPick(task._id)}
                      variant="contained" sx={{backgroundColor: `${activeFocus === task._id ? "#b91c1c" : "black"}`, minWidth: "0px", padding: "5px" }}>
                        <CenterFocusStrong fontSize="8px"/>
                      </Button>
                    </Tooltip>
                  </div>
                ))
              }
            </div>
          </DialogContent>
        )
      }
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "grey",
            color: "white",
            fontSize: "12px",
            paddingX: "8px",
            paddingY: "4px",
            "&:hover": { opacity: 0.8, backgroundColor: "grey" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleFocusChange(taskId)}
          disabled={isLoading}
          sx={{
            backgroundColor: "#b91c1c",
            color: "white",
            fontSize: "12px",
            marginRight: "18px",
            paddingX: "8px",
            paddingY: "4px",
            ml: 1,
            "&:hover": { opacity: 0.8, backgroundColor: "#b91c1c" },
          }}
        >
          {isLoading ? <span className="text-white">Selecting</span> : <span>Select</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SelectFocusModal;
