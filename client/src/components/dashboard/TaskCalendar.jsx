import { useState } from "react";

import { useCalendarTaskData } from "../../hooks/useCalendarTaskData";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/TaskCalendar.css";

import { Box, Typography, Badge } from "@mui/material";
import { PushPin } from "@mui/icons-material";


export default function TaskCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const taskData = useCalendarTaskData();

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
    <div className="bg-white rounded-lg shadow-md py-4 hover:bg-gray-50 active:bg-gray-50 transform transition-transform easin-out hover:-translate-y-1 active:-translate-y-1">
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
        <div className="flex flex-col mt-1 overflow-hidden">
          {getTasksForDate(currentDate).length > 0 ? (
            getTasksForDate(currentDate).map((task, idx) => (
              <span key={idx} className="text-xs ml-4 flex items-center gap-1 break-words">
                <PushPin className="text-red-700 rotate-45" sx={{fontSize: "12px"}}/> {task.title}
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