import React from 'react'
import { IoClose } from 'react-icons/io5'

function AddField({close,value,onChange,submit}) {
  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 bg-opacity-70 z-50 flex justify-center items-center p-4'>
        <div className='bg-white rounded p-4 max-w-[40vw] w-full'>
            <div className='flex justify-between items-center gap-3 '>
                <h1 className='font-semibold'>Add Field </h1>
                <button onClick={close}>
                    <IoClose size={25}/>
                </button>
            </div>
            <input 
            className='my-3 bg-blue-50 w-full p-2 border rounded outline-none focus-within:border-primary-200'
            type="text"
            placeholder='Enter field name'
            onChange={onChange}
            value={value}
            />
            <button onClick={submit} className='bg-primary-200 px-4 py-2 rounded border border-primary-200 hover:bg-white block mx-auto w-fit'>Add Field </button>
        </div>
    </section>
  )
}

export default AddField
