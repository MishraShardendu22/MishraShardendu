const logout = async (req,res) => {
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

export {
    logout,
}