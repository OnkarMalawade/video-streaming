import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
        api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    
    const uploadOnCloudinary = async (localFilePath) => {
        try{
            if(!localFilePath) return null
            // upload file path 
            const response = cloudinary.uploader.upload(localFilePath,{
                resource_type : "auto"
            })
            // file has been successfully uploaded
            console.log("file is uploaded on cloudinary",
                response.url
            );
            return response

        }catch(err){
            fs.unlinkSync(localFilePath)
            // remove locally saved file as upload config failed
            console.error("Error : " , err);
            return null;
        }
    }
})();

export { uploadOnCloudinary }