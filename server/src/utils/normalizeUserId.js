export const normalizeUserId = (userOrId) => {
  if (!userOrId) return null;

  if (typeof userOrId === "object") {
    if (userOrId._id) return userOrId._id.toString();
    return userOrId.toString(); // fallback, e.g. Mongoose ObjectId
  }

  return userOrId.toString();
};