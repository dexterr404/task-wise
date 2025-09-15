export function getUserRole(user, team) {
  if (!team || !user) return "Guest";

  // Normalize user ID
  const userId = user._id || user.id;
  if (!userId) return "Guest";

  // Look inside members (Leader/Admin/Member)
  const member = team.members.find(
    (m) => (m.user._id || m.user.id) === userId
  );

  if (member) {
    return member.role || "Member";
  }

  return "Guest";
}
