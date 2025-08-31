import { useState, useEffect } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";

function CountdownTimer({ deadline }) {
  const calculateTimeLeft = () => {
    const difference = new Date(deadline) - new Date();
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  if (!timeLeft) return <Typography>Deadline reached!</Typography>;

  return (
    <div className="flex gap-7 max-sm:flex-col mx-auto">
      {["days", "hours", "minutes", "seconds"].map((unit) => (
        <Box key={unit} textAlign="center">
          <Typography variant="h6" fontWeight="bold">
            {timeLeft[unit].toString().padStart(2, "0")}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {unit.toUpperCase()}
          </Typography>
        </Box>
      ))}
    </div>
  );
}

export default function TaskWithCountdown() {
  const nextDeadline = "2025-09-05T23:59:59"; // ISO format

  return (
    <div className="flex flex-col w-full bg-white shadow-lg rounded-lg px-10 py-4 relative">
      <span className="text-sm font-semibold mb-2">Focus deadline</span>
      <CountdownTimer deadline={nextDeadline} />
      <div className="absolute top-1 right-4">
        <Tooltip title="Change focus">
          <IconButton>
            <SwapHoriz fontSize="small" className="text-green-800"/>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
