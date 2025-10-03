import { useSelector, useDispatch } from "react-redux";
import { AutoAwesome, HelpOutline, Insights } from "@mui/icons-material";
import { getInsights } from "../../api/aiService";
import { useState, useEffect, useMemo } from "react";
import { addUser } from "../../features/user/userSlice";
import toast from "react-hot-toast";
import { selectPendingTasks } from "../../features/task/taskSlice";
import { Button, Tooltip } from "@mui/material";

function DailyDigest() {
  const tasks = useSelector(selectPendingTasks);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState(user.insights.insights || []);
  const [generate, setGenerate] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);

  const getCooldownDuration = () => {
    if (!user?.subscription) return 12 * 60 * 60 * 1000;
    return user?.subscription?.plan === "pro" ? 30 * 60 * 1000 : 12 * 60 * 60 * 1000;
  };

  // Format tasks for AI prompt
  const formattedTasks = useMemo(
    () =>
      tasks.map((task) => ({
        title: task.title,
        description: task.description,
        deadline: new Date(task.deadline).toISOString().split("T")[0],
        status: task.status,
        priority: task.priority,
      })),
    [tasks]
  );

  const promptData = JSON.stringify(formattedTasks);

  // Calculate remaining time until next generate
  const calculateRemainingTime = () => {
    if (!user?.insights?.createdAt || !user?.insights?.insights?.length)
      return 0;
    const now = new Date();
    const lastCreated = new Date(user.insights.createdAt).getTime();
    const cooldown = getCooldownDuration();
    const remaining = cooldown - (now - lastCreated);
    return remaining > 0 ? remaining : 0;
  };

  // Format milliseconds into hh:mm:ss
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Update remaining time and button state every second
  useEffect(() => {
    const update = () => {
      const remaining = calculateRemainingTime();
      setRemainingTime(remaining);
      setGenerate(formattedTasks.length > 0 && remaining === 0);
    };

    update(); // run immediately
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [user, formattedTasks]);

  // Handle AI insights generation
  const handleGenerate = async () => {
    if (!formattedTasks.length)
      return toast.error("Add some tasks first to generate insights");
    if (!generate) return;

    setIsLoading(true);
    try {
      const res = await getInsights(promptData, user.id);
      setInsights(res.insights);

      const updatedUser = { ...user, insights: res };
      dispatch(addUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setRemainingTime(getCooldownDuration());
      setGenerate(false);
    } catch (error) {
      toast.error("Failed to generate insights");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface border-1 border-border shadow-md rounded-md p-4 w-full relative cursor-pointer  hover:-translate-y-1 active:-translate-y-1 transform transition-transform duration-200 ease-in-out">
      
      {/* Countdown Tooltip */}
      {remainingTime > 0 && (
        <Tooltip title={`Wait ${formatTime(remainingTime)}`}>
          <HelpOutline
            sx={{ fontSize: "14px", position: "absolute", top: "14px", right: "90px", color: "var(--color-text-primary)" }}
          />
        </Tooltip>
      )}

      {/* Generate Button */}
      <Tooltip title="Generate insights">
          <Button
            aria-label="Generate insights"
            disabled={isLoading || !generate}
            variant="contained"
            onClick={handleGenerate}
            sx={{
              textTransform: "none",
              fontSize: "12px",
              paddingX: "6px",
              paddingY: "2px",
              backgroundColor: "#4f46e5",
              position: "absolute",
              top: "8px",
              right: "8px",
            }}
          >
            <AutoAwesome sx={{ fontSize: "12px", marginRight: "2px" }} />
            {isLoading ? "Generating..." : "Generate"}
          </Button>
      </Tooltip>

      <h3 className="flex items-center gap-1 text-sm text-text-primary font-semibold mb-3 mx-2"><Insights fontSize="small" sx={{ color: "#4f46e5"}}/> AI Insights</h3>

      {isLoading ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary animate-pulse">
            <AutoAwesome sx={{ fontSize: "12px", marginRight: "3px" }} />
            Generating insights…
          </span>
        </div>
      ) : insights.length === 0 ? (
        <p className="text-xs text-text-secondary">
          Consider adding tasks today to view insights 🚀
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {insights.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-start gap-2 text-xs text-text-secondary"
            >
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DailyDigest;
