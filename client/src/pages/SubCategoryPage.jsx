import React, { useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'

const SubCategoryPage = () => {
  const [openAddsubCategory, setOpenAddSubCategory] = useState(false)
  // const [loading, setLoading] = useState(false)
  return (
    <section className=''>
      <div className='p-2 bg-white shadow-md flex justify-between items-center'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={()=>setOpenAddSubCategory(true)} className='text-sm hover:bg-primary-200 border border-primary-100 p-2 rounded '>Add Sub Category</button>
      </div>

      {
        openAddsubCategory && (
          <UploadSubCategory
          close={()=>setOpenAddSubCategory(false)}
            />
        )
      }
    </section>
  )
}

export default SubCategoryPage
