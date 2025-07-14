import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const isLogin = async (req, res, next) => {
    try {
        console.log("check-1 middleware");

        const token = req.cookies.jwt;  // Error fix: 'req.cookie' should be 'req.cookies' to correctly access the cookie.
        console.log(token);

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token not found"
            });
        }
        console.log("check-2 middleware");

        const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedInfo) {
            return res.status(401).send({
                success: false,
                message: "User Unauthorized - Invalid Token"
            });
        }

        console.log(decodedInfo)
        console.log("check-3 middleware");
        const user = await User.findById(decodedInfo.userId).select("-password");
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User Not Found"
            });
        }

        console.log("check-4 middleware");
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in verifying the token", error.message);  // Corrected typo: 'mesage' to 'message'
        res.status(500).send({
            success: false,
            message: "Error in verifying the token"
        });
    }
};
