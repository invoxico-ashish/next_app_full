import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExipry: Date,
    verifyToken: String,
    verifyTokenExipry: Date,
});
const User = mongoose.model.users || mongoose.model("User", userSchema);
export default User;