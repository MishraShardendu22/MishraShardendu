import jwt from 'jsonwebtoken';
import { apiResponse } from '../utils/resposne.util.js';
export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return apiResponse(res, 401, "Unauthorized: No token provided", [], "");
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return apiResponse(res, 401, "Unauthorized: Invalid token", [], "");
            }
            req.user = decoded;
            next();
        });
    }
    catch (error) {
        console.error("Error in authMiddleware: ", error);
        return apiResponse(res, 500, "Internal Server Error", [], "");
    }
};
