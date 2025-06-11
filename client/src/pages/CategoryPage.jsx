import React from 'react'
import UploadCategory from '../components/UploadCategory'
import { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import { useSelector } from 'react-redux'

const CategoryPage = () => {
    const [openUploadCategory,setOpenUploadCategory] = useState(false)
    const [loading,setLoading] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [openEdit,setOpenEdit] = useState(false)
    const [editData,setEditData] = useState({
        name : "",
        image : ""
    })
    const [openConfirmBoxDelete,setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
    })
    const allCategory = useSelector((state)=>state.product.allCategory)
    
    useEffect(()=>{
        setCategoryData(allCategory)
    },[allCategory])

    // const fetchCategory = async ()=>{
    //     try {
    //         setLoading(true)
    //         const response = await Axios ({
    //             ...SummaryApi.getCategory
    //         })
    //         const {data : responseData} = response
    //         if(responseData.success){
    //             setCategoryData(responseData.data)
    //         }
    //         console.log(responseData)
    //         // console.log(categoryData)
    //     } catch (error) {
    //         toast.error(error.message)
    //     }finally{
    //         setLoading(false)
    //     }
    // }

    // useEffect(()=>{
    //     fetchCategory()
    // },[])

    const handleDeleteCategory = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory ,
                data : deleteCategory
            })

            const {data : responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <section>
        <div className='p-2 bg-white shadow-md flex justify-between items-center'>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=>setOpenUploadCategory(true)} className='text-sm hover:bg-primary-200 border border-primary-100 p-2 rounded '>Add Category</button>
        </div>
        {
            !categoryData[0] && !loading && (
                <NoData/>
            )
        }

        <div className='p-4 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2'>
        {
            categoryData.map((category)=>{
                return (
                    <div className='w-32 h-56 object-scale-down overflow-hidden bg-[#edf4ff] rounded shadow-md' key={category._id}>
                        <img src={category.image} alt={category.name} className='w-full object-scale-down'/>
                        <div className='items-center h-9 flex gap-2'>
                            <button 
                            onClick={
                                ()=>{
                                    setOpenEdit(true)
                                    setEditData(category)
                                }
                            } 
                            className='flex-1 text-green-800 bg-green-200 hover:bg-green-300 font-medium rounded p-1'>
                                Edit
                            </button>
                            <button
                                onClick={()=>{
                                    setOpenConfirmBoxDelete(true)
                                    setDeleteCategory(category)
                                }
                                }
                             className='flex-1 text-red-800 bg-red-200 hover:bg-red-300 font-medium rounded p-1'>
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })
        }
        </div>

        {
            loading && (
                <Loading/>
            )
        }

        {
            openUploadCategory && (
                <UploadCategory fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
            )
        }

        {
            openEdit && (
                <EditCategory data={editData} fetchData={fetchCategory} close={()=>{setOpenEdit(false)}}/>
            )
        }

        {
            openConfirmBoxDelete && (
                <ConfirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory} />
            )
        }
    </section>
  )
}

export default CategoryPage

