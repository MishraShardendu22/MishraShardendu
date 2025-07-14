import jwt from "jsonwebtoken"

const jwtToken = (userId , res)=>{
    const token = jwt.sign({userId},"Ilikecookies",{
        expiresIn:'30d'
    })
    res.cookie('jwt',token,{
        maxAge: 30 *24 *60 *60 *1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.SECURE !== "devlopment"
    })
}

export default jwtToken