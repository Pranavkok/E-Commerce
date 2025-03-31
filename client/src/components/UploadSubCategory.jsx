import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";

const UploadSubCategory = ({close}) => {
    const [subCategoryData,setSubCategoryData] = useState({
        name : "",
        image : "",
        category : []
    })

    const handleChange = (e)=>{
        const {name,value} = e.target
        setSubCategoryData((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }
  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 z-50 bg-opacity-70 flex items-center justify-center'>
        <div className='w-full max-w-5xl bg-white p-4 rounded '>
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Add Sub Category </h1>
                <button onClick={close}>
                    <IoClose size={25}/>
                </button>
            </div>
            <form action="" className='mt-3 grid gap-3'>
                    <div className='grid gap-1'>
                        <label htmlFor="">Name </label>
                        <input 
                        id='name'
                        value={subCategoryData.name}
                        name='name'
                        onChange={handleChange}
                        className='p-3 bg-blue-50 outline-none border focus-within:border-primary-200' 
                        type="text" 
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex flex-col gap-3'>
                            <div className='h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    subCategoryData.image ? (
                                        <img src={subCategoryData.image} alt={subCategoryData.name} className='w-full h-full object-cover'/>
                                    ) : (
                                        <p className='text-center text-sm text-neutral-400'>No Image</p>
                                    )
                                }
                            </div>
                            <button className='px-4 py-1 border border-primary-100 text-primary-200 rounded' type='button'>
                                Upload Image
                            </button>
                        </div>
                    </div>
            </form>
        </div>
    </section>
  )
}

export default UploadSubCategory
