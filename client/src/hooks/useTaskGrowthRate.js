import { useSelector } from "react-redux";

export function useTaskGrowthRate() {
  const tasks = useSelector((state) => state.tasks.list);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let prevMonth = currentMonth - 1;
  let prevYear = currentYear;
  if (prevMonth < 0) {
    prevMonth = 11; // December
    prevYear = currentYear - 1;
  }

  // Track counts for each status
  const currentCounts = { total: 0, done: 0, ongoing: 0, pending: 0 };
  const lastCounts = { total: 0, done: 0, ongoing: 0, pending: 0 };

  tasks.forEach((task) => {
    const d = new Date(task.createdAt);
    const month = d.getMonth();
    const year = d.getFullYear();

    const target =
      month === currentMonth && year === currentYear
        ? currentCounts
        : month === prevMonth && year === prevYear
        ? lastCounts
        : null;

    if (target) {
      target.total += 1;

      if (task.status === "Done") target.done += 1;
      else if (task.status === "Ongoing") target.ongoing += 1;
      else if (task.status === "Not Started") target.pending += 1;
    }
  });

  // Helper to calculate growth %
  const calcGrowth = (curr, prev) => {
    if (prev > 0) return Math.round(((curr - prev) / prev) * 100);
    if (curr > 0) return "New";
    return 0;
  };

  return {
    total: calcGrowth(currentCounts.total, lastCounts.total),
    done: calcGrowth(currentCounts.done, lastCounts.done),
    ongoing: calcGrowth(currentCounts.ongoing, lastCounts.ongoing),
    pending: calcGrowth(currentCounts.pending, lastCounts.pending),
  };
}

export default useTaskGrowthRate;
