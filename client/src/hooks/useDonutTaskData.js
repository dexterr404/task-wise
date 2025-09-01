import { useSelector } from "react-redux";

export function useDonutTaskData() {
    const tasks = useSelector((state) => state.tasks.list);

    let ongoingNumber = 0;
    let doneNumber = 0;
    let notStartedNumber = 0;
    const total = tasks.length;

    tasks.forEach((task) => {
        if(task.status === "Ongoing") ongoingNumber += 1;
        else if(task.status === "Done") doneNumber += 1;
        else if(task.status === "Not Started") notStartedNumber += 1;
    });

    const donePercentage = total > 0 ? Math.round((doneNumber / total) * 100) : 0;

    const data = [
        { label: "Ongoing", value: ongoingNumber, color: "#F59E0B" },
        { label: "Done", value: doneNumber, color: "#10B981" },
        { label: "Not Started", value: notStartedNumber, color: "#6B7280" }
    ]

    return { data, donePercentage };
}