import User from "../schema/user.schema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isLoggedIn = async (req, res, next) => {
    try {
        console.log("Middleware Check-1: Checking JWT");

        const token = req.cookies.jwt;
        console.log("Middleware Check-2: Token: ", token);

        if (!token) {
            console.log("Unauthorized: No token");
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Middleware Check-3: Decoded JWT: ", decoded);

        if (!decoded) {
            console.log("Unauthorized: Invalid token");
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const user = await User.findById(decoded.userId).select('-password');
        console.log("Middleware Check-4: User: ", user);

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in isLoggedIn middleware: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
