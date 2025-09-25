import { useSelector } from "react-redux";

export function useDonutTaskData() {
    const tasks = useSelector((state) => 
    [
        ...state.tasks.personal,
        ...state.tasks.team,
    ]);

    const total = tasks.length;

    const doneStatuses = ["Done"];
    const ongoingStatuses = ["Ongoing","Doing","Review"];
    const pendingStatuses = ["Not Started","Backlog","To Do"];

    const doneNumber = tasks.filter((t) => doneStatuses.includes(t.status)).length;
    const ongoingNumber = tasks.filter((t) => ongoingStatuses.includes(t.status)).length;
    const pendingNumber = tasks.filter((t) => pendingStatuses.includes(t.status)).length;

    const donePercentage = total > 0 ? Math.round((doneNumber / total) * 100) : 0;

    const data = [
        { label: "Ongoing", value: ongoingNumber, color: "#F59E0B" },
        { label: "Done", value: doneNumber, color: "#10B981" },
        { label: "Not Started", value: pendingNumber, color: "#6B7280" }
    ]

    return { data, donePercentage };
}