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
    const pendingTasks = tasks.filter((t) => pendingStatuses.includes(t.status)&& !t.isArchived);

    return pendingTasks;
})

export const { setPersonalTasks, setTeamTasks, addTask, deleteTask, updateTask, updateSubtask } = taskSlice.actions;
export default taskSlice.reducer;