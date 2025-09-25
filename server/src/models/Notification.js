import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true},
    description: { type: String, required: true},
    type: { type: String, enum: ["task","team","system"], default: "system" },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Notification = new mongoose.model("Notification", notificationSchema);

export default Notification;