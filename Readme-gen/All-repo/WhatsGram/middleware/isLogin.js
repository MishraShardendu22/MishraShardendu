import jwt from 'jsonwebtoken'
import User from '../Models/userModels.js'

const isLogin = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) return res.status(500).send({ success: false, message: "User Unauthorize" });
        const decode = jwt.verify(token,"Ilikecookies");
        if(!decode)  return res.status(500).send({success:false, message:"User Unauthorize -Invalid Token"})
        const user = User.findById(decode.userId).select("-password");
        if(!user) return res.status(500).send({success:false, message:"User not found"})
        req.user = user,
        next()
    } catch (error) {
        console.log(`error in isLogin middleware ${error.message}`);
        res.status(500).send({
            success: false,
            message: error
        })
    }
}

export default isLogin
