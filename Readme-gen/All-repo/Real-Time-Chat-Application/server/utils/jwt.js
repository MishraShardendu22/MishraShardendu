import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId,res) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '4d' }
    )
    res.cookie("jwt",token,{
        maxAge : Date.now() + 86400000,
        httpOnly : true,
        secure : process.env.NODE_ENV == "production",
        sameSite : "strict"
    })
}