import { useSelector } from "react-redux";

export function useTaskDeadline(taskId) {
    const tasks = useSelector((state) => [
        ...state.tasks.personal,
        ...state.tasks.team
    ]);

    const task = tasks.find( task => task._id === taskId);

    return task ? task.deadline : null
}