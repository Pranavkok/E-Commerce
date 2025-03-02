import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <header className='h-20 shadow-md sticky top-0'>
        <div className='container mx-auto items-center h-full flex px-2 justify-between'>

          {/* logo section */}
          <div className='h-full'>
            <Link to={"/"} className='h-full flex justify-center items-center'>
              <img src={logo} alt="logo" width={170} height={60} className='hidden lg:block'/>
              <img src={logo} alt="logo" width={170} height={60} className='lg:hidden'/>
            </Link>
          </div>

          {/* search */}
          <div>
            <Search/>
          </div>

          {/* login and my cart */}
          <div>
            login cart 
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
