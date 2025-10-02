import { useState } from "react";

import { useCalendarTaskData } from "../../hooks/useCalendarTaskData";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/TaskCalendar.css";

import { Box, Typography, Badge } from "@mui/material";
import { EventNote } from "@mui/icons-material";

export default function TaskCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const taskData = useCalendarTaskData();

  // Find earliest and latest task dates
  const minDate = taskData.length
    ? new Date(Math.min(...taskData.map((t) => t.date.getTime())))
    : new Date(2000, 0, 1); // fallback if no tasks

  const maxDate = taskData.length
    ? new Date(Math.max(...taskData.map((t) => t.date.getTime())))
    : new Date(2100, 11, 31); // fallback if no tasks

  const getTasksForDate = (date) => {
    return taskData.filter(
      (task) =>
        task.date.getFullYear() === date.getFullYear() &&
        task.date.getMonth() === date.getMonth() &&
        task.date.getDate() === date.getDate()
    );
  };

  return (
    <div className="bg-surface border-1 border-border rounded-lg shadow-md py-4 transform transition-transform easin-out hover:-translate-y-1 active:-translate-y-1">
      <span className="flex items-center gap-1 text-sm text-text-primary font-semibold font-inter px-6">
        <EventNote fontSize="small" sx={{color: "#2563eb"}}/>Schedule Calendar
      </span>

      <Calendar
        value={currentDate}
        onClickDay={(value) => setCurrentDate(value)}
        onActiveStartDateChange={({ activeStartDate }) =>
          setCurrentDate(activeStartDate)
        }
        minDate={minDate}
        maxDate={maxDate}
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

      <Box mt={2.5} px={4} pb={4}>
        <span className="font-bold text-text-primary text-sm">
          Tasks on {currentDate.toDateString()}:
        </span>
        <div className="flex flex-col mt-1 overflow-hidden">
          {getTasksForDate(currentDate).length > 0 ? (
            getTasksForDate(currentDate).map((task, idx) => (
              <span
                key={idx}
                className="text-sm ml-4 text-text-secondary flex items-center gap-1 break-words"
              >
                {idx+1 + `. `+task.title}
              </span>
            ))
          ) : (
            <Typography
              variant="body2"
              color="var(--color-text-secondary)"
              sx={{ ml: 1}}
            >
              No tasks scheduled.
            </Typography>
          )}
        </div>
      </Box>
    </div>
  );
}
