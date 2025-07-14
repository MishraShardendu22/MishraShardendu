import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.destroy(localFilePath)
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);

        return response;

    } catch (error) {
        console.error("Error in deleting the file on cloudinary", error)
        return null;
    }
}


export {uploadOnCloudinary}



// (async function() {
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET
//     });
    
//     const uploadCloudinary = async (filePath) => {
//         try{
//             if(!filePath){
//                 return null;
//             }else{
//                 const response = await cloudinary.uploader.upload(filePath,{
//                     resource_type: "auto"
//                 })
//                 console.log("File Uploaded",response.url);
//                 return response;
//             }
//         }catch(error){
//             fs.unlinkSync(filePath); // removing temporary file as it wasn't uploaded
//             return null;
//         }
//     }
//     const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });       
//     console.log(uploadResult);
// })();

// export { uploadCloudinary };