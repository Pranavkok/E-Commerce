import React from 'react'
import { useState } from 'react'
import { IoClose } from "react-icons/io5";

const UploadCategory = ({close}) => {
    const[data,setData] = useState({
        name : "",
        image : ""
    })

    const handleOnChange = (e)=>{
        const {name,value} = e.target
        setData((prev)=>{
           return { 
            ...prev,
            [name]:value
        }
        }) 
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
        <div className='bg-white max-w-4xl w-full p-4 rounded '>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>Category</h1>
                <button onClick={close} className='w-fit block ml-auto'>
                    <IoClose size={25}/>
                </button>
            </div>
            <form action="" className='grid gap-3 my-3' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor="">Name : </label>
                    <input 
                    type="text" 
                    id='CategoryName'
                    placeholder='Enter Category Name'
                    value={data.name}
                    name='name'
                    onChange={handleOnChange}
                    className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded '
                    />
                </div>
                <div className='grid gap-1'>
                    <p>Images : </p>
                    <div className='flex gap-4 flex-col lg:flex-row items-center'>
                        <div className='border bg-blue-50 h-52 w-full lg:w-52 flex items-center justify-center'>
                            <p className='text-sm text-neutral-500'>No Image</p>
                        </div>
                        <label htmlFor="uploadCatgegoryImage">
                            <div disabled={!data.name} className={`
                                ${!data.name? "bg-gray-400" : "bg-primary-200"} px-4 py-2 rounded  w-fit cursor-pointer
                                `}>Upload Image
                            </div>
                            <input type="file" id='uploadCatgegoryImage' className='hidden' />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    </section>
  )
}

export default UploadCategory
