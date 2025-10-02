import { useState } from "react";
import { Divider, IconButton, Checkbox, Avatar, AvatarGroup } from "@mui/material";
import { MoreHoriz, Chat, PersonAdd, RadioButtonUnchecked, CheckCircle } from "@mui/icons-material";

const priorityColors = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500"
};

export default function StaticTaskCard({demo}) {

  const countRemainingDays = (deadline) => {
    const diff = new Date(deadline) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : "Due soon";
  };

  return (
    <div className="flex flex-col card gap-2 relative px-5 pt-12 pb-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 shadow-xl w-64">
      {/* menu button */}
      <div className="absolute top-2 right-2">
        <IconButton
          onClick={() => setOption((prev) => !prev)}
          sx={{ width: 28, height: 28, padding: 0, color: "var(--color-text-secondary)" }}
        >
          <MoreHoriz fontSize="small" />
        </IconButton>
      </div>

      {/* priority badge */}
      <div className="absolute top-3 left-4">
        <span className={`${priorityColors[demo.priority]} px-3 py-1 rounded-md text-[8px] text-white`}>
          {demo.priority}
        </span>
      </div>

      {/* task content */}
      <div className="flex flex-col gap-2">
        <p className="font-medium text-gray-900 dark:text-gray-100">{demo.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{demo.description}</p>
      </div>

      {/* deadline */}
      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        {countRemainingDays(demo.deadline)}
      </div>

      {/* subtasks */}
      <div>
        {demo.subtasks.map((subtask, idx) => (
          <div key={idx} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <Checkbox
              checked={subtask.status === "Done"}
              icon={<RadioButtonUnchecked sx={{ fontSize: 16, color: "gray" }} />}
              checkedIcon={<CheckCircle sx={{ fontSize: 16, color: "green" }} />}
              sx={{ padding: 0 }}
            />
            <span className={subtask.status === "Done" ? "line-through" : "text-gray-900 dark:text-gray-100"}>
              {subtask.title}
            </span>
          </div>
        ))}
      </div>

      <Divider />

      {/* footer: comments & assignees */}
      <div className="flex justify-between items-center mt-2">
        <IconButton sx={{ position: "relative", color: "var(--color-text-primary)" }}>
          <Chat sx={{ fontSize: 16 }} />
          {demo.commentsCount > 0 && (
            <div className="absolute -top-0.5 -right-1 flex items-center justify-center pt-0.5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-medium">
              {demo.commentsCount}
            </div>
          )}
        </IconButton>

        <div className="flex items-center text-xs gap-2">
          <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 18, height: 18, fontSize: 11, backgroundColor: "gray", marginLeft: '-4px' } }}>
            {demo.assignedTo.map((user, idx) => (
              <Avatar key={idx} alt={user.name} src={user.profileImage || ""} sx={{ width: 18, height: 18 }} />
            ))}
          </AvatarGroup>
          <IconButton>
            <PersonAdd sx={{ fontSize: 16, color: "var(--color-text-primary)" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
