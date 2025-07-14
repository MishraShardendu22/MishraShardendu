import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/jwt.js" 

export const userRegister = async (req,res) => {
    try{
        const { fullname, username, email, gender, password, profilepic } = req.body;
        console.log(req.body);

        const user = await User.findOne(
            {
                username,
                email
            }
        )

        if(user){
            return res.status(500).send(
                {
                    success : false,
                    message : "UserName or Email Alredy Exist"
                }
            )
        }

        const hashedPassword = await bcryptjs.hash(password,10);
        const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User(
            {
                fullname,
                username,
                email,
                password : hashedPassword,
                gender,
                profilepic : gender === "male" ? profileBoy : profileGirl
            }
        )

        if(newUser){
            await newUser.save();
            generateToken(newUser._id,res)
        }else{
            res.status(500).send(
                {
                    success : false,
                    message : "User Not Created"
                }
            )
        }

        res.status(200).send(
            {
                _id : newUser._id,
                fullname : newUser.fullname,
                username : newUser.username,
                email : newUser.email,
                profilepic : newUser.profilepic,
            }
        )

    }catch(error){
        res.status(500).send({
            success: false,
            message: "Error in signing-in the user"
        })
        console.log(error);
        console.log("Error in registering the user");
    }
}

export const userLogin = async (req,res) => {
    try{
        const { email, password } = req.body;
        console.log("check-1")
        const user = await User.findOne(
            {
                email,
            }
        )

        console.log("check-2")
        if(!user){
            return res.status(500).send(
                {
                    success : false,
                    message : "User Not Found"
                }
            )
        }

        console.log("check-3")
        const isPasswordMatch = await bcryptjs.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(500).send(
                {
                    success : false,
                    message : "Password Not Match"
                }
            )
        }

        console.log("check-4")
        generateToken(user._id,res)
        
        console.log("check-5")
        res.status(200).send(
            {
                _id : user._id,
                fullname : user.fullname,
                username : user.username,
                profilepic : user.profilepic,
                email : user.email,
                message : "Successfully Logged In"
            }
        )
        
    }catch(error){
        res.status(500).send({
            success: false,
            message: "Error in logging-in the user"
        })
        console.log(error);
        console.log("Error in logging-in the user");
    }
}

export const userLogout = async (req,res) => {
    try{
        // res.clearCookie("token");
        res.cookie("jwt",'',{
            maxAge : 0
        })
        res.status(200).send({
            success: true,
            message: "Successfully Logged Out"
        })
    }catch(error){
        res.status(500).send({
            success: false,
            message: "Error in logging-out the user"
        })
        console.log(error);
        console.log("Error in logging-out the user");
    }
}