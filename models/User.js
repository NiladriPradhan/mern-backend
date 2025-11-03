import mongoose from "mongoose";
import Schema from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unquie: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    }
})

const User = mongoose.model("User",UserSchema);
export default User;