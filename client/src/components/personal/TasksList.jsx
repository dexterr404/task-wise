import TaskCard from '../ui/TaskCard';
import { CircularProgress } from '@mui/material'
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const TasksList = ( {tasks,isLoading}) => {

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
    if(!tasks || tasks.length === 0 ) {
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

    const activeTasks = tasks?.filter((task) => !task.isArchived) || [];

    // UI for no active task
    if (activeTasks.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full py-10 gap-2">
        <SentimentDissatisfiedIcon fontSize="large" color="disabled" />
        <h2 className="text-lg font-semibold">No Active Tasks</h2>
        <p className="text-gray-500 text-center">
            Add a new task to get started!
        </p>
        </div>
    );
    }
    
    return (
        <div className="flex flex-col bg-white px-4 pt-6 pb-30 gap-3">
            {
                tasks
                .filter((task) => !task.isArchived)
                .map((task) => (
                    <TaskCard key={task._id} task={task}
                    />
                ))
            }
        </div>
    )
}

export default TasksList
