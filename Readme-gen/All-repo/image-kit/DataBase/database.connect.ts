import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if(!MONGO_URI){
    throw new Error("MongoDB URI must be defined");
}

let cached = global.mongoose;
if(!cached){
    cached = global.mongoose ={
        connection : null,
        promise : null
    }
}

const ConnectToDatabase = async () => {
    if(cached.connection){
        return cached.connection;
    }

    if(!cached.promise){
        const option = {
            maxPoolSize : 5,
            bufferCommands : false,
        };

        cached.promise = mongoose.connect(MONGO_URI!, option).then((mongoose): mongoose.Connection => {
            return mongoose.connection;
        });

        try{
            cached.connection = await cached.promise;
            console.log("Connected to the database");
            return cached.connection;
        }catch(error){
            console.error("Error connecting to the database: ", error);
            cached.promise = null;
        }
    }
}

export {
    ConnectToDatabase,
}