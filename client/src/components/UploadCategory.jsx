import React from 'react'
import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'

const UploadCategory = ({close,fetchData}) => {
    const[data,setData] = useState({
        name : "",
        image : ""
    })

    const [loading,setLoading] = useState(false)

    const handleOnChange = (e)=>{
        const {name,value} = e.target
        setData((prev)=>{
           return { 
            ...prev,
            [name]:value
        }
        }) 
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios ({
                ...SummaryApi.addCategory,
                data : data
            })

            const {data : responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
            }
        } catch (error) {
            toast.error("Unable to upload",error.message)
        }finally{
            setLoading(false)
            fetchData()
            close()
        }
    }

    const handleUploadCategory = async (e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const response = await uploadImage(file)
        const {data : ImageResponse} = response 
        setData((prev)=>{
            return {
                ...prev ,
                image : ImageResponse.data.url
            }
        })
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
                            {
                                data.image ?(
                                    <img src={data.image} alt="category" className='w-full h-full object-scale-down'/>
                                ):(
                                    <p className='text-sm text-neutral-500'>No Image</p>
                                )
                            }
                        </div>
                        <label htmlFor="uploadCatgegoryImage">
                            <div className={`
                                ${!data.name? "bg-gray-400" : "bg-primary-200"} px-4 py-2 rounded  w-fit cursor-pointer
                                `}>Upload Image
                            </div>
                            <input disabled={!data.name} onChange={handleUploadCategory} type="file" id='uploadCatgegoryImage' className='hidden' />
                        </label>
                    </div>
                </div>

                <button className={`
                    ${data.name && data.image  ? "bg-primary-100 hover:bg-primary-200" : "bg-gray-400"}
                    py-2 font-semibold rounded 
                    `}>Add Category</button>
            </form>
        </div>
    </section>
  )
}

export default UploadCategory
