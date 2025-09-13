import mongoose from "mongoose";

const teamSubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true }
});

const teamTaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    deadline: { type: Date },
    column: {type: String, default: "Backlog"},
    order: {type: Number, default: 0},
    priority: {type: String, default: "Medium"},
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    subtasks: [teamSubtaskSchema],
    team: {type: mongoose.Schema.Types.ObjectId, ref: "Team"},
}, { timestamps: true });

export default mongoose.model("TeamTask", teamTaskSchema);