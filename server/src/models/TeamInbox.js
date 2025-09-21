import mongoose from "mongoose";

const teamInboxSchema = new mongoose.Schema({
  title: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ["team", "member", "task", "system"],
    default: "system",
  },
  author: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    profileImage: String,
  },
  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model("TeamInbox", teamInboxSchema);