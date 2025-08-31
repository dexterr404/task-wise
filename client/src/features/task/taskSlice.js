import { createSlice,createSelector } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "tasks",
    initialState: { list: [] },
    reducers: {
        setTasks: (state, action) => {
            state.list = action.payload;
        },
        addTask: (state, action) => {
            state.list.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.list = state.list.filter( t => t._id !== action.payload);
        },
        updateTask: (state, action) => {
            const index = state.list.findIndex( t => t._id === action.payload);
            if (index !== -1) state.list[index] = action.payload;
        },
        updateSubtask: (state, action) => {
            const { taskId, subtaskId, status } = action.payload;

            const task = state.list.find( t => t._id === taskId);
            if (!task) return;

            const subtask = task.subtasks.find( s => s._id === subtaskId);
            if (subtask) {
                subtask.status = status
            }
        }
    }
})

export const selectTasks = (state) => state.tasks.list;

export const selectTaskStats = createSelector([selectTasks], (tasks) => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "Done").length;
    const ongoing = tasks.filter((t) => t.status === "Ongoing").length;
    const pending = tasks.filter((t) => t.status === "Not Started").length;

    return { total, done, ongoing, pending};
});

export const { setTasks, addTask, deleteTask, updateTask, updateSubtask } = taskSlice.actions;
export default taskSlice.reducer;