import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/TaskCalendar.css";
import { Box, Typography, Badge } from "@mui/material";
import { PushPin } from "@mui/icons-material";

// Example task data: each task has a date and title
const taskData = [
  { date: new Date(2025, 8, 1), title: "Team meeting" },
  { date: new Date(2025, 8, 2), title: "Code review" },
  { date: new Date(2025, 8, 3), title: "Design mockup deadline" },
  { date: new Date(2025, 8, 5), title: "Project deadline" },
  { date: new Date(2025, 8, 7), title: "Sprint planning" },
  { date: new Date(2025, 8, 10), title: "Client presentation" },
  { date: new Date(2025, 8, 12), title: "Deploy update" },
  { date: new Date(2025, 8, 15), title: "Performance review" },
  { date: new Date(2025, 8, 18), title: "Bug bash" },
  { date: new Date(2025, 8, 20), title: "Team lunch" },
  { date: new Date(2025, 8, 20), title: "Quarterly report" },
  { date: new Date(2025, 8, 20), title: "Release retrospective" },
];

export default function TaskCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Check if a date has tasks
  const getTasksForDate = (date) => {
    return taskData.filter(
      (task) =>
        task.date.getFullYear() === date.getFullYear() &&
        task.date.getMonth() === date.getMonth() &&
        task.date.getDate() === date.getDate()
    );
  };

  // Navigate months
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md py-4">
      <span className="text-sm font-semibold font-inter px-10">Schedule Calendar</span>
      <Calendar
      value={currentDate}
      onClickDay={(value) => setCurrentDate(value)}
      onActiveStartDateChange={({ activeStartDate }) =>
        setCurrentDate(activeStartDate)
      }
      tileContent={({ date, view }) => {
        if (view === "month") {
          const tasks = getTasksForDate(date);
          if (tasks.length > 0) {
            return (
              <Box display="flex" justifyContent="center" mt={0.5}>
                <Badge color="primary" variant="dot" />
              </Box>
            );
          }
        }
        return null;
      }}
      className="!w-full !max-w-full font-caveat"
      
    />

      {/* Task list for selected date */}
      <Box mt={2} px={4} pb={4}>
        <span className="font-bold text-sm">
          Tasks on {currentDate.toDateString()}:
        </span>
        <div className="flex flex-col">
          {getTasksForDate(currentDate).length > 0 ? (
            getTasksForDate(currentDate).map((task, idx) => (
              <span className="text-sm ml-4 flex gap-3">
                <PushPin className="text-red-700 rotate-45" fontSize="small"/> {task.title}
              </span>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1, mt: 0.5 }}>
              No tasks scheduled.
            </Typography>
          )}
        </div>
      </Box>
    </div>
  );
}