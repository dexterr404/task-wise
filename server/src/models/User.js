import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: {type: String },
    googleId: { type: String, unique: true, sparse: true },
    focus: { type: mongoose.Schema.Types.ObjectId, ref: "Task", default: null },
    profileImage: {type: String, default: ""},
    insights: {
        insights: [String],
        createdAt: { type: Date, default: Date.now }
    },
    subscription: {
        plan: { type: String, enum: ["free", "pro"], default: "free" },
        paypalSubscriptionId: { type: String },
        status: { type: String, enum: ["active", "canceled", "past_due"], default: "active" },
        startDate: { type: Date },
        endDate: { type: Date },
        nextBillingDate: { type: Date },
    },
    invoices: [
    {
        subscriptionId: String,
        amount: Number,
        currency: String,
        paidAt: Date,
        paypalPaymentId: String
    }
    ]
}, { timestamps: true });

//Hash the password before save
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//Match Password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;