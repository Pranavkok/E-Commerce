import React from 'react'
import noDataImage from '../assets/nothing here yet.webp'

const NoData = () => {
  return (
    <div className=' flex flex-col items-center justify-center p-4 gap-4'>
      <img 
      src={noDataImage} 
      alt="NoData" 
      className='w-40'
      />
      <p className='text-gray-700'>No Data</p>
    </div>
  )
}

export default NoData
