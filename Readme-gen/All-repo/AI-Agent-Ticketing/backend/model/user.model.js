import { model, Schema } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user", "moderator"],
        default: "user",
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
});
const User = model("User", userSchema);
export { User };
