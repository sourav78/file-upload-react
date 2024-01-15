import React from 'react'

function Preview({ previewImageName, previewImage}) {
    return (
        <>
            <div className=" mt-3 flex flex-col items-center">
                <p className='text-2xl text-white text-center'>{previewImageName}</p>
                <img className=' max-h-72' src={previewImage} alt="" />
            </div>
        </>
    )
}

export default Preview