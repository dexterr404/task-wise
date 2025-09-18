import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date },
  status: { type: String, default: "Ongoing" },
  isArchived: {type: Boolean, default: false },
  archivedAt: {type: Date, default: Date.now},
  priority: { type: String, default: "Medium" },
  subtasks: [subtaskSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
