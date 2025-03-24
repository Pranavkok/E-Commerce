import React from 'react'
import UploadCategory from '../components/UploadCategory'
import { useState } from 'react'

const CategoryPage = () => {
    const [openUploadCategory,setOpenUploadCategory] = useState(false)
  return (
    <section>
        <div className='p-2 bg-white shadow-md flex justify-between items-center'>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=>setOpenUploadCategory(true)} className='text-sm hover:bg-primary-200 border border-primary-100 p-2 rounded '>Add Category</button>
        </div>
        {
            openUploadCategory && (
                <UploadCategory close={()=>setOpenUploadCategory(false)}/>
            )
        }
    </section>
  )
}

export default CategoryPage

