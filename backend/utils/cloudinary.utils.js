const { v2: cloudinary } = require('cloudinary')
const fs = require('fs')
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

const uploadOnCloudynary = async (localFilePath, imageName) => {
    
    try {
        if(!localFilePath) return null

        const result = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
            public_id: imageName,
            folder: "react-multer"
        })

        fs.unlinkSync(localFilePath)
        
        return result
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }

}

module.exports = uploadOnCloudynary