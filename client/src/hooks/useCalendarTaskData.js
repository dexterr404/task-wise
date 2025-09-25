import { useSelector } from "react-redux";

export function useCalendarTaskData() {
    const tasks = useSelector((state) => [
        ...state.tasks.personal,
        ...state.tasks.team
    ]);

    const calendarData = tasks.map((task) => ({
        date: new Date(task.deadline),
        title: task.title,
    }));

    return calendarData
}