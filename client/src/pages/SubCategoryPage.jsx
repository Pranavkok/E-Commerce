import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'
import { AxiosError } from 'axios'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import DisplayTable from '../components/DisplayTable.jsx'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage.jsx'
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import EditSubCategory from '../components/EditSubCategory.jsx'
import AxiosToastError from '../utils/AxiosToastError.js'
import ConfirmBox from '../components/ConfirmBox.jsx'

const SubCategoryPage = () => {
  const [openAddsubCategory, setOpenAddSubCategory] = useState(false)
  const [Data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageUrl, setImageUrl] = useState("")
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    _id: "",
  })
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: ""
  })
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)

  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      })

      const {data : responseData} = response 

      if(responseData.success){
        setData(responseData.data)
        console.log("Sub category data fetched successfully:", responseData.data)
        toast.success("Sub category fetched successfully")
      }
    } catch (error) {
      AxiosError(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  },[])

  const column = [
    columnHelper.accessor('name',{
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: (info) => (
        <div className='flex justify-center items-center'>
          <img src={info.getValue()} alt="Sub Category" className='w-8 h-8 object-cover' 
          onClick={()=>{
            console.log("Image clicked: ", info.getValue())
            setImageUrl(info.getValue())
          }}
          />
        </div>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({row}) => {
        return (
          <>{row.original.category.map((c,index)=>{
            return (
              <p key={c._id + "table"} className='shadow-md inline-block'> {c.name}</p>
            )
          })}</>
        )
      }
    }),
    columnHelper.accessor('_id',{
      header : "Actions",
      cell : ({row}) => {
        return (
          <div className='flex justify-center items-center gap-3'>
            <button onClick={()=>{setOpenEdit(true) ,setEditData(row.original)}}  className='p-2 rounded-full bg-green-400 hover:bg-green-500'>
            <MdOutlineEdit size={20} />
            </button>
            <button onClick={()=>{setOpenDeleteConfirmBox(true),setDeleteSubCategory(row.original)}} className='p-2 rounded-full bg-red-400 hover:bg-red-500'>
            <MdOutlineDelete size={20}/>
            </button>
          </div>
        )
      }
    })
  ]

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data:deleteSubCategory
      })

      const {data : responseData} = response
      if(responseData.success){
        toast.success("Sub Category deleted successfully")
        setOpenDeleteConfirmBox(false)
        fetchSubCategory()
        setDeleteSubCategory({
          _id: ""
        })
      } else {
        toast.error("Failed to delete Sub Category")
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className=''>
      <div className='p-2 bg-white shadow-md flex justify-between items-center'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={()=>setOpenAddSubCategory(true)} className='text-sm hover:bg-primary-200 border border-primary-100 p-2 rounded '>Add Sub Category</button>
      </div>
      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable data={Data} column={column}/>
      </div>
      {
        openAddsubCategory && (
          <UploadSubCategory
          close={()=>setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
            />
        )
      }

      {
        ImageUrl &&
        <ViewImage url={ImageUrl} close={()=>setImageUrl("")}/>
      }
      { openEdit &&
        <EditSubCategory data={editData}  close={()=>{setOpenEdit(false)}}  fetchData={fetchSubCategory}/>
      }

      {
        openDeleteConfirmBox && (
          <ConfirmBox
          cancel={()=> setOpenDeleteConfirmBox(false)}
          close={()=> setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
            />
        )
      }
    </section>
  )
}

export default SubCategoryPage
