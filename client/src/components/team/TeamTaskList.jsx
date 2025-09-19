import { Typography } from "@mui/material"
import TaskCard from "../ui/TaskCard"

export function TeamTaskList({ columns,team }) {
  // Flatten all tasks from all columns into one array
  const allTasks = Object.values(columns).flat()

  return (
    <main className="flex flex-col gap-2 w-full">
      {
      allTasks?.length === 0 ? (
        <Typography sx={{ color: "text.secondary", fontSize: 14, textAlign: "center", py: 4 }}>No active tasks </Typography>
      ) : (
        allTasks
          .filter((task) => !task.isArchived)
          .map((task) => (
            <TaskCard task={task} key={task._id} team={team}/>
          ))
      )
     }
    </main>
  )
}

export default TeamTaskList
