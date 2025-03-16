import React from 'react'
import UserMenu from '../components/userMenu'
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-2'>
      <button onClick={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto'><IoClose size={25}/></button>
      <div className='container mx-auto px-3 py-5'>
        <UserMenu/>
      </div>
    </section>
  )
}

export default UserMenuMobile

