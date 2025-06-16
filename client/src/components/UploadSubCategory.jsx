import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
// import { IoClose } from "react-icons/io5";
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError';

const UploadSubCategory = ({close,fetchData}) => {
    const [subCategoryData,setSubCategoryData] = useState({
        name : "",
        image : "",
        category : []
    })

    const allCategory = useSelector(state => state.product.allCategory)

    // console.log("All category data: ", allCategory)

    const handleChange = (e)=>{
        const {name,value} = e.target
        setSubCategoryData((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubCategoryImage = async (e)=>{
        const file = e.target.files[0]
        if(!file){
            return
        }
        const response = await uploadImage(file)
        const {data : ImageResponse} = response 
        setSubCategoryData((prev)=>{
            return {
                ...prev ,
                image : ImageResponse.data.url
            }
        })
    }

    const handleRemoveCategorySelected = (id)=>{
        const index = subCategoryData.category.findIndex(cat=>cat._id === id)
        subCategoryData.category.splice(index,1)
        setSubCategoryData((prev)=>{
            return {
                ...prev
            }
        })
    }

    const handleSubmitSubCategory = async (e)=>{
        e.preventDefault()
        try {
            console.log("Submitting data:", subCategoryData)
            const response = await Axios({
                ...SummaryApi.createSubCategory,
                data : subCategoryData
            })
            
            const {data : responseData} = response

            console.log("Response from server:", responseData)
            if(responseData.success){
                toast.success(responseData.message) 
                if(close){
                    close()
                }
                if(fetchData){
                    fetchData()
                }
            }
        } catch (error) {
            console.error("Error submitting subcategory:", error)
            AxiosToastError(error)
        }
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
            <form onSubmit={handleSubmitSubCategory} className='mt-3 grid gap-3'>
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
                        <div className='flex flex-col gap-3 lg:flex-row items-center'>
                            <div className='h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    subCategoryData.image ? (
                                        <img src={subCategoryData.image} alt={subCategoryData.name} className='w-full h-full object-cover'/>
                                    ) : (
                                        <p className='text-center text-sm text-neutral-400'>No Image</p>
                                    )
                                }
                            </div>
                            <label htmlFor="uploadSubCategoryImage">
                                <div className='cursor-pointer px-4 py-1 border border-primary-100 hover:text-white hover:bg-primary-100 text-primary-200 rounded ' type='button '>
                                    Upload Image
                                </div>
                                <input onChange={handleSubCategoryImage} type="file" id='uploadSubCategoryImage' className='hidden'/>
                            </label>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="">Select Category</label>
                        <div className='border focus-within:border-primary-200 rounded'>
                        {/* <label htmlFor="">Select Category</label> */}
                        <div className='flex flex-wrap gap-2 p-2'>
                        {
                            subCategoryData.category.map((cat,index)=>{
                                return (
                                    <p className='bg-white shadow-md px-1 m-1 flex items-center gap-2' key={cat?._id+"selectedValue"} >
                                        {cat?.name}
                                        <div className='cursor-pointer hover:text-red-600' onClick={()=>handleRemoveCategorySelected(cat._id)}>
                                            <IoClose/>
                                        </div>
                                    </p>
                                )
                            })
                        }
                        </div>
                            <select 
                            onChange={(e)=>{
                                const value = e.target.value
                                const categoryDetails = allCategory.find(el=>el._id === value)
                                setSubCategoryData((prev)=>{
                                    return {
                                        ...prev,
                                        category : [...prev.category, categoryDetails._id]
                                    }
                                })
                            }} 
                            name="category" id="category" className=' w-full p-2 bg-transparent outline-none border'>
                                <option value={""}>Select Category</option>
                                {
                                    allCategory.map((category,index)=>{
                                        return (
                                            <option value={category?._id} key={category?._id+"sub-category"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button type="submit" className={` font-semibold px-4 py-2 border ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? "border-primary-200 hover:text-white hover:bg-primary-200 text-primary-200" : "border-neutral-300 text-neutral-600"} rounded`          
                    } >Submit</button>
            </form>
        </div>
    </section>
  )
}

export default UploadSubCategory
