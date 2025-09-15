import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            role: {
                type: String,
                enum: ["Admin","Member","Leader"],
                default: "Member"
            },
            joinedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    inviteToken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Team", teamSchema);