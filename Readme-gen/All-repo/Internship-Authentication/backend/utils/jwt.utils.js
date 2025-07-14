import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId, res) => {
    console.log("Generating Token for userId: ", userId);
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict"
    });
    console.log("Token generated and sent in cookie");

    return token;
};
