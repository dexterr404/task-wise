import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { SwapHoriz,AccessTime } from "@mui/icons-material";
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
    return <div className="flex justify-center">
      <span className="text-slate-800 text-sm font-semibold pb-4">No focused task. Set a new one</span>
    </div>
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  if (!timeLeft) return <span className="flex items-center text-sm justify-center pb-4 font-semibold text-slate-800"><AccessTime fontSize="small"/> Deadline reached!</span>;

  return (
    <div className="flex gap-7 max-sm:flex-col mx-auto">
      {["days", "hours", "minutes", "seconds"].map((unit) => (
        <Box key={unit} textAlign="center">
          <Typography variant="h6" fontWeight="bold" fontFamily="var(--font-orbitron)">
            {timeLeft[unit].toString().padStart(2, "0")}
          </Typography>
          <Typography variant="caption" color="black">
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
    <div className="flex flex-col w-full bg-white rounded-xl px-8 py-4 relative shadow-lg">
      <span className="text-sm font-semibold mb-2">Focus deadline</span>
      <CountdownTimer deadline={deadline} focusId={focusId} />
      <div className="absolute top-1 right-4">
        <Tooltip title="Change focus">
          <IconButton onClick={() => setIsFocusModalOpen((prev) => !prev)}>
            <SwapHoriz fontSize="small" className="text-green-800"/>
          </IconButton>
        </Tooltip>
      </div>
      <SelectFocusModal open={isFocusModalOpen} setFocusId={setFocusId} onClose={() => setIsFocusModalOpen(false)}/>
    </div>
  );
}
