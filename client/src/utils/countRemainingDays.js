
function countRemainingDays(deadline) {
  const now = new Date();
  now.setHours(0,0,0,0);

  const dueDate = new Date(deadline);
  dueDate.setHours(0,0,0,0);

  const diff = dueDate - now;
  const remainingDays = diff / (1000 * 60 * 60 * 24);

  if (remainingDays === 0) return "Due today";
  if (remainingDays === 1 ) return "Due tomorrow";
  if (remainingDays < 0) return "Overdue";
  return `${remainingDays} day${remainingDays > 2 ? "s" : ""} left`;
}


export default countRemainingDays