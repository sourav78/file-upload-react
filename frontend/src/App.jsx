import { useState } from 'react'
import uploadPng from './assets/cloud-computing.png'
import './App.css'

import axios from 'axios'

function App() {

    const [file, setFile] = useState(null)
    const [loading, setloading] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0])

        const filePrev = e.target.files[0]
        console.log();

        if(filePrev){
            const reader = new FileReader()

            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }

            reader.readAsDataURL(filePrev)
        }else{
            setPreviewImage(null)
        }
    }

    const handleClick = async () => {

        setloading(true)

        const formData = new FormData()
        formData.append('uploadImage', file)

        try {
            const response = await axios.post("http://localhost:3000/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response.data);



        } catch (error) {
            console.error("Error is", error);
        }

        setloading(false)
        setPreviewImage(null)
    }

    return (
        <>
            <div className="w-full h-screen overflow-hidden bg-slate-700">
                <div className="w-3/5 border-white p-4 m-auto">
                    <h1 className='text-5xl font-semibold text-white text-center'>Upload your image</h1>
                    <div className="w-9/12 m-auto p-8 border border-white mt-10">
                        <div className="w-96 p-3 min-h-48 border border-white rounded-lg m-auto bg-slate-600 flex justify-center items-center">
                            <form encType="multipart/form-data">
                                {
                                    loading ? (
                                        <div className='m-auto' role="status">
                                            <svg aria-hidden="true" className="inline w-32 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : (
                                        <label className=' cursor-pointer' htmlFor="uploadImage">
                                            <img className='w-1/2 m-auto' src={uploadPng} alt="" />
                                        </label >
                                    )
                                }
                                <input
                                    className='hidden'
                                    type="file"
                                    name="uploadImage"
                                    id="uploadImage"
                                    onChange={handleFileChange}
                                />
                            </form>
                        </div>
                        <div className="mt-8 text-center">
                            <button 
                                onClick={handleClick} 
                                className='m-auto rounded-md shadow-xl bg-green-500 hover:bg-green-600 transition-all px-3 py-1 text-white text-2xl'
                            >Upload</button>
                        </div>
                    </div>
                    <div className=" mt-3 flex justify-center">
                        <img className=' max-h-72' src={previewImage} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
