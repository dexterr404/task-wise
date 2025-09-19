import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Tooltip, Divider,} from "@mui/material";
import { CenterFocusStrong, TrackChanges } from "@mui/icons-material";
import toast from "react-hot-toast";
import { selectPendingTasks } from "../task/taskSlice";
import { updateFocus } from "../../api/userService";
import { addUser } from "./userSlice";
import { colors } from "../../data/colors";

function SelectFocusModal({open,onClose,setFocusId}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFocus, setActiveFocus] = useState(user.focus || "");
  const [taskId, setTaskId] = useState("");

  const pendingTasks = useSelector(selectPendingTasks);

  //Update ui when focus changes
  useEffect(() => {
    if (user.focus) {
      setActiveFocus(user.focus);
    }
  }, [user.focus]);

  //The task can be unfocused if clicked when it is already focused
  const handleFocusPick = (taskId) => {
  if (activeFocus === taskId) {
    setActiveFocus("");
    setTaskId("");
  } else {
    setActiveFocus(taskId);
    setTaskId(taskId);
  }
};
  
  //Update the focus of user in database
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
        sx: { borderRadius: 2, p: 1 },
      }}
    >
      <DialogTitle component="div">
      <div className="flex items-center gap-1">
        <TrackChanges fontSize="small" sx={{ color: colors.darkerblue}}/> <div className="text-sm">Select Focus</div>
      </div>
      </DialogTitle>
      <Divider />
      {/*Different ui if there is a task or no task to be focused*/}
      {
        pendingTasks.length === 0 ? (
          <DialogContent>
            <span>No tasks to focus on</span>
          </DialogContent>
        ) : (
           <DialogContent>
            <div className="flex flex-col gap-1">
              {pendingTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between rounded-lg border-1 border-gray-300 p-3 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-sm truncate">
                      {task.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <Tooltip title="Focus">
                    <Button
                      onClick={() => handleFocusPick(task._id)}
                      variant="contained"
                      sx={{
                        backgroundColor: activeFocus === task._id ? "#1D4ED8" : "white",
                        minWidth: "32px",
                        padding: "5px",
                        borderRadius: "8px",
                      }}
                    >
                      <TrackChanges
                        fontSize="small"
                        sx={{ color: activeFocus === task._id ? "white" : "black" }}
                      />
                    </Button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </DialogContent>
        )
      }
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{
             fontSize: "12px", textTransform: "none", color: "gray"
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleFocusChange(taskId)}
          disabled={isLoading}
          variant="contained"
          sx={{
            fontSize: "12px", backgroundColor: "#1D4ED8","&:hover": { backgroundColor: "#1E40AF" }, textTransform: "none", marginRight: "14px"
          }}
        >
          {isLoading ? <span className="text-white">Selecting</span> : <span>Select</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SelectFocusModal;
