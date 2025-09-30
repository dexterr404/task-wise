import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 20 }}>
        <Typography variant="body2" sx={{ color: "var(--color-text-primary)" }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ task, className }) {
  if (!task) return null;

  const subtaskCompleted = task.subtasks.filter((s) => s.status === "Done").length;
  const total = task.subtasks.length;

  let targetProgress = 0;

  // ✅ Main logic
  if (task.status === "Done") {
    // If parent is marked done → always 100%
    targetProgress = 100;
  } else if (total > 0) {
    // Otherwise → progress comes from subtasks
    targetProgress = (subtaskCompleted / total) * 80;
  }

  // Smooth animation
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < targetProgress) {
          return Math.min(oldProgress + 2, targetProgress);
        } else if (oldProgress > targetProgress) {
          return Math.max(oldProgress - 2, targetProgress);
        }
        return oldProgress;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [targetProgress]);

  return (
    <Box className={className} sx={{ width: "30%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
