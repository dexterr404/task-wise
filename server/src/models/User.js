import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true}
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
    profileImage: {type: String, default: ""},
    notification: [notificationSchema]
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