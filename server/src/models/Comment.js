import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    message: { type: String, maxlength: 1000 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "TeamTask", required: true },
    images: [{ type: String }]
}, { timestamps: true });

commentSchema.index({ task: 1, createdAt: -1 });

export default mongoose.model("Comment", commentSchema);
