import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { SwapHoriz,AccessTime, TrackChanges } from "@mui/icons-material";
import SelectFocusModal from "../../features/user/SelectFocusModal";
import { useTaskDeadline } from "../../hooks/useTaskDeadline";

function CountdownTimer({ deadline,focusId }) {
  const calculateTimeLeft = () => {
    const difference = new Date(deadline).getTime() - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null;
    }

    return timeLeft;
  };

  if(!focusId) {
    return <div className="flex justify-center bg-surface">
      <span className="text-text-secondary text-sm py-7">No focused task. Set a new one</span>
    </div>
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  if (!timeLeft) return <span className="flex items-center text-sm justify-center py-7 font-semibold text-text-secondary"><AccessTime fontSize="small"/> Deadline reached!</span>;

  return (
    <div className="flex gap-7 max-sm:flex-col mx-auto">
      {["days", "hours", "minutes", "seconds"].map((unit) => (
        <Box key={unit} textAlign="center">
          <Typography variant="h6" fontSize="32px" fontWeight="800" color="var(--color-text-primary)" fontFamily="var(--font-work-sans)">
            {timeLeft[unit].toString().padStart(2, "0")}
          </Typography>
          <Typography variant="caption" color="var(--color-text-secondary)">
            {unit.toUpperCase()}
          </Typography>
        </Box>
      ))}
    </div>
  );
}

export default function TaskWithCountdown() {
  const user = useSelector((state) => state.user);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [focusId, setFocusId] = useState(user.focus || "");
  const deadline = useTaskDeadline(focusId);

  return (
    <div className="flex flex-col w-full bg-surface border-1 border-border rounded-xl px-8 py-4 relative shadow-lg cursor-pointer transform transition-transform easin-out hover:-translate-y-1 active:-translate-y-1">
      <span className="text-sm flex items-center gap-1 font-semibold text-text-primary"><TrackChanges fontSize="small" sx={{ color: "darkblue"}}/>Focus deadline</span>
      <CountdownTimer deadline={deadline} focusId={focusId} />
      <div className="absolute top-1 right-4">
        <Tooltip title="Change focus">
          <IconButton onClick={() => setIsFocusModalOpen((prev) => !prev)}>
            <SwapHoriz fontSize="small" className="text-text-primary"/>
          </IconButton>
        </Tooltip>
      </div>
      <SelectFocusModal open={isFocusModalOpen} setFocusId={setFocusId} onClose={() => setIsFocusModalOpen(false)}/>
    </div>
  );
}
