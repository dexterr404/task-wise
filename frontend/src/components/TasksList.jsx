import TaskCard from './TaskCard'
import { CircularProgress } from '@mui/material'
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const TasksList = ( {tasks,isLoading,fetchTask}) => {

    if(isLoading) {
        return (
            <div className="w-full h-full flex gap-3 py-15 justify-center items-center">
                Loading Tasks...
                <CircularProgress size={20} />
            </div>
        )
    }

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
        <div className="flex flex-col gap-3 py-2">
            {
                tasks.map((task) => (
                    <TaskCard key={task._id} task={task} fetchTask={() => fetchTask()}/>
                ))
            }
        </div>
    )
}

export default TasksList
