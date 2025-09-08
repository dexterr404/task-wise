//Get user's role
export function getUserRole(user, team) {
  if (!team || !user?.id) return "guest";

  // Owner always has the highest privilege
  if (team.owner._id === user.id) return "owner";

  // Check membership
  const member = team.members.find(m => m.user._id === user.id);
  if (member) return member.role || "member";

  return "guest";
}

