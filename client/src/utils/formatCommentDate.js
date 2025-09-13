export default function formatCommentDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  // Helper to format time as HH:MM AM/PM
  const formatTime = (d) => {
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = ((hours + 11) % 12) + 1;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Check if today
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // Check if yesterday
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  // Check if within last 7 days
  const diffTime = now - date; // in milliseconds
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekday = weekdays[date.getDay()];

  // Decide display format
  if (isToday) return `Today at ${formatTime(date)}`;
  if (isYesterday) return `Yesterday at ${formatTime(date)}`;
  if (diffDays < 7) return `${weekday} at ${formatTime(date)}`;
  
  // Older messages: full date
  return `${date.toLocaleDateString()} at ${formatTime(date)}`;
}
