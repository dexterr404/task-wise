
function countRemainingDays(deadline) {
    const now = new Date();
    const deadlineDate = new Date(deadline);

    const diff = deadlineDate - now;
    const remainingDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (remainingDays < 0) return "Overdue";
    if (remainingDays === 0) return "Due today";
    return `${remainingDays} days left`;
}

export default countRemainingDays