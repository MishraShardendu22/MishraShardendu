import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JSign } from "../utils/jwt.util.js";
import { User } from "../model/user.model.js";
import { apiResponse } from "../utils/resposne.util.js";
import { inngest } from "../inngeest/index.inngest.js";
export const signup = async (req, res) => {
    try {
        const { email, password, skills = [] } = req.body;
        if (!email || !password) {
            return apiResponse(res, 400, "Email and password are required.");
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            skills
        });

        console.log("Inngest Working 1");
        await inngest.send({
            name: "user/signup",
            data: {
                email: user.email,
            }
        });
        console.log("User signup event sent to Inngest");
        const token = JSign(user);
        const savedUser = await user.save();
        return apiResponse(res, 201, "User created successfully.", savedUser, token);
    }
    catch (error) {
        console.error("Error during signup:", error);
        return apiResponse(res, 500, "Internal server error.");
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return apiResponse(res, 400, "Email and password are required.");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return apiResponse(res, 404, "User not found.");
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return apiResponse(res, 401, "Invalid password.");
        }
        const token = JSign(user);
        return apiResponse(res, 200, "Login successful.", user, token);
    }
    catch (error) {
        console.error("Error during login:", error);
        return apiResponse(res, 500, "Internal server error.");
    }
};
export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return apiResponse(res, 400, "No token provided.");
        }
        jwt.verify(token, process.env.JWT_SECRET || "", (err) => {
            if (err) {
                return apiResponse(res, 401, "Invalid token.");
            }
        });
        return apiResponse(res, 200, "Logout successful.");
    }
    catch (error) {
        console.error("Error during logout:", error);
        return apiResponse(res, 500, "Internal server error.");
    }
};
export const updateUser = async (req, res) => {
    try {
        const { skills = [], email, role } = req.body;
        const user = req.user;
        if (!user) {
            return apiResponse(res, 401, "Unauthorized: User not found.");
        }
        if (user.role !== "admin") {
            return apiResponse(res, 403, "Forbidden: Only admins can update user details.");
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return apiResponse(res, 404, "User not found.");
        }
        await User.updateOne({ email }, { $set: { skills, role } });
        return apiResponse(res, 200, "User updated successfully.", existingUser);
    }
    catch (error) {
        console.error("Error during user update:", error);
        return apiResponse(res, 500, "Internal server error.");
    }
};
export const getUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return apiResponse(res, 401, "Unauthorized: User not found.");
        }
        if (user.role !== "admin") {
            return apiResponse(res, 403, "Forbidden: Only admins can view user details.");
        }
        const users = await User.find().select("-password");
        return apiResponse(res, 200, "Users retrieved successfully.", users);
    }
    catch (error) {
        console.error("Error during get user:", error);
        return apiResponse(res, 500, "Internal server error.");
    }
};
