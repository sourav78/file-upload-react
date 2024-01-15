const { v2: cloudinary } = require('cloudinary')
const fs = require('fs')
          
cloudinary.config({ 
  cloud_name: 'sourav78', 
  api_key: '616679495748689', 
  api_secret: 'xqXJsq-Mitt6QJxn_hv6D9gR_C0' 
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