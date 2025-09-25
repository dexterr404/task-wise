import { createSlice,createSelector } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "tasks",
    initialState: { personal: [], team: [] },
    reducers: {
        setPersonalTasks: (state, action) => {
            state.personal = action.payload;
        },
        setTeamTasks: (state, action) => {
            state.team = action.payload;
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

export const selectAllTasks = (state) => [
  ...state.tasks.personal,
  ...state.tasks.team,
];

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => {
  const total = tasks.length;

  const done = tasks.filter((t) => t.status === "Done").length;

  const ongoingStatuses = ["Ongoing", "Doing", "Review"];
  const ongoing = tasks.filter((t) => ongoingStatuses.includes(t.status)).length;

  const pendingStatuses = ["Not Started", "Backlog", "To Do"];
  const pending = tasks.filter((t) => pendingStatuses.includes(t.status)).length;

  return { total, done, ongoing, pending };
});



export const selectPendingTasks = createSelector([selectAllTasks], (tasks) => {
    const pendingStatuses = ["Ongoing","Not Started","Doing","Review","Doing","Backlog","To Do"];
    const pendingTasks = tasks.filter((t) => pendingStatuses.includes(t.status));

    return pendingTasks;
})

export const { setPersonalTasks, setTeamTasks, addTask, deleteTask, updateTask, updateSubtask } = taskSlice.actions;
export default taskSlice.reducer;