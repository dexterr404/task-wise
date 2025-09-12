import TaskCard from './TaskCard'
import { CircularProgress } from '@mui/material'
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const TasksList = ( {tasks,isLoading,onDelete,onEdit,onSubtaskUpdate,onDoneTask,unDoneTask,onDuplicateTask}) => {

    //Show loading if fetching
    if(isLoading) {
        return (
            <div className="w-full h-full flex gap-3 py-15 justify-center items-center">
                Loading Tasks...
                <CircularProgress size={20} />
            </div>
        )
    }

    //UI for no task
    if(tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full py-10 gap-2">
                <SentimentDissatisfiedIcon fontSize="large" color="disabled" />
                <h2 className="text-lg font-semibold">No Tasks Yet</h2>
                <p className="text-gray-500 text-center">
                Add a new task to get started!
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-white px-4 pt-6 pb-30 gap-3">
            {
                tasks.map((task) => (
                    <TaskCard key={task._id} task={task}
                    onDelete={() => onDelete(task._id)}
                    onEdit={(updatedData) => onEdit(task._id, updatedData)}
                    onSubtaskUpdate={(taskId, updatedTask) => onSubtaskUpdate(taskId, updatedTask)}
                    onDoneTask={(updatedTask) => onDoneTask(task._id, updatedTask)}
                    unDoneTask={(updatedTask) => unDoneTask(task._id, updatedTask)}
                    onDuplicateTask={(newTask) => onDuplicateTask(newTask)}
                    />
                ))
            }
        </div>
    )
}

export default TasksList
