import React from 'react'
import UserMenu from '../components/userMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)
  console.log("here is the user details : ", user)
  return (
    <section className='bg-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[280px,1fr]'>
                {/* Left Part for Menu */}
                <div  className=' mr-3 py-4 max-h-[calc(100vh-200px)] sticky top-24 overflow-y-auto hidden lg:block '>
                    <UserMenu/>
                </div>

                {/* Right Part for Content */}
                <div className='bg-white min-h-[80vh] '>
                    <Outlet></Outlet>
                </div>
        </div>
    </section>
  )
}

export default Dashboard
