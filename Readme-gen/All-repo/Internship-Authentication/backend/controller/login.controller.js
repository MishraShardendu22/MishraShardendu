import User from "../schema/user.schema.js"
import {generateToken} from "../utils/jwt.utils.js"
import bcrypt from "bcrypt"

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ error: "User not found" });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if(!result){
                return res.status(400).json({ error: "Invalid credentials" });
            }
        });

        const token = generateToken(user._id,res);
        console.log(token);

        return res.status(200).json({ 
            message: "Login success", 
            user, 
            token 
        });
    }catch(error){
        console.log(error);
        res.status(400).json({ error: "Login failed" })
    }
}


export {
    login,
}