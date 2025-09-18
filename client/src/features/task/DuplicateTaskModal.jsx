import {useState} from "react";
import {Dialog,DialogTitle,DialogActions,Button,DialogContent,Typography, Divider,} from "@mui/material";
import { toast } from "react-hot-toast";
import { ContentCopy } from "@mui/icons-material";
import { colors } from "../../data/colors";

function DuplicateTaskModal({open,onClose,task,onDuplicateTask}) {
  const [isLoading, setIsLoading] = useState(false);

  //Duplicate task in database
  const handleDuplicate = async() => {
    setIsLoading(true);
    const {title,description,deadline,priority,subtasks} = task;

    try {
        const newTask = ({
          title,
          description,
          deadline,
          priority,
          subtasks
        })
        await onDuplicateTask({newTask});
        onClose();
      } catch (error) {
        console.log(error);
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
      <DialogTitle variant="h8" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <ContentCopy fontSize="small"  sx={{ color: colors.lighterblue }}/> Duplicate the task?
      </DialogTitle>
       <Divider />
      <DialogContent>
        <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
          This will create a copy of the task with all its details, including subtasks and priority.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
        >
          Don't
        </Button>
        <Button
          onClick={() => handleDuplicate()}
          disabled={isLoading}
          variant="contained"
          sx={{ fontSize: "12px", backgroundColor: "#2196F3", "&:hover": { backgroundColor: "#1976D2" }, textTransform: "none", marginRight: "14px" }}
        >
          { isLoading ? <span className="text-white">Duplicating</span> : <span>Duplicate</span>}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DuplicateTaskModal;
