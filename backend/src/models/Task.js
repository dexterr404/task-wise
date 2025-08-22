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
  priority: { type: String, default: "Medium" },
  subtasks: [subtaskSchema]
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
