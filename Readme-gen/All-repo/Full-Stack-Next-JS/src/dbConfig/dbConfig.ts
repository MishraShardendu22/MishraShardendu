import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Connected to Database");
        })

        connection.on('error',(err) =>{
            console.log("Error in Connection");
            console.log(err);
            process.exit();
        })
        
    }catch(err){
        console.log("SomeThing Went wrong !!");
        console.log(err);
    }
}