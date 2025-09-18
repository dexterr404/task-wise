import TaskCard from "../ui/TaskCard"

export function TeamTaskList({ columns,team }) {
  // Flatten all tasks from all columns into one array
  const allTasks = Object.values(columns).flat()

  return (
    <main className="flex flex-col gap-4 w-full">
      {
      allTasks?.length === 0 ? (
        <div className="flex justify-center">No active tasks </div>
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
