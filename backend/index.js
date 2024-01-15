const express = require('express')
const upload = require('./middleware/multer.middleware')
const uploadOnCloudynary = require('./utils/cloudinary.utils')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors({
    origin: "http://localhost:5173",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/upload', upload.single("uploadImage"), async (req, res) => {
    const result = await uploadOnCloudynary(`./public/images/${req.file.filename}`, req.file.filename)

    // console.log(req.file);
    console.log(result);

    if(result === null){
        return res.status(200).json({
            success: false,
            data: "Image not uploaded"
        })
    }else{
        return res.status(200).json({
            success: true,
            data: result
        })
    }

})


app.listen(port, () => console.log(`server started: http://localhost:${port}`))