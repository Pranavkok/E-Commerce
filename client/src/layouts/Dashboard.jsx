import React from 'react'
import UserMenu from '../components/userMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <section className='bg-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[280px,1fr]'>
                {/* Left Part for Menu */}
                <div  className=' mr-3 py-4 sticky top-24 overflow-y-auto hidden lg:block'>
                    <UserMenu/>
                </div>

                {/* Right Part for Content */}
                <div className='bg-white p-4'>
                    <Outlet></Outlet>
                </div>
        </div>
    </section>
  )
}

export default Dashboard
