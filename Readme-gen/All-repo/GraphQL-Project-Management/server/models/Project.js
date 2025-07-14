import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        name : {
            type : String,
        },
        description : {
            type : String,
        },
        status : {
            type : String,
            enum : ["Started","Not Started","Completed"],
        },
        clientId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Client",
        }
    }
)

const Project = mongoose.model("Project",projectSchema);
export default Project;