import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === '/search'
  const navigate = useNavigate()

  const redirectToLogin = ()=>{
      navigate("/login")
  }

  return (
      <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 flex items-center justify-center flex-col gap-1 bg-white'>
            {
                !(isMobile && isSearchPage)&&(<div className='container mx-auto items-center flex px-2 justify-between'>

                {/* logo section */}
                <div className='h-full'>
                  <Link to={"/"} className='h-full flex justify-center items-center'>
                    <img src={logo} alt="logo" width={170} height={60} className='hidden lg:block'/>
                    <img src={logo} alt="logo" width={170} height={60} className='lg:hidden'/>
                  </Link>
                </div>
      
                {/* search */}
                <div className='hidden lg:block'>
                  <Search/>
                </div>
      
                {/* login and my cart */}
                <div>
                  {/* for the mobile */}
                  <button className='text-neutral-600 lg:hidden'>
                    <FaRegUserCircle size={27} />
                  </button>
                  {/* for the Desktop */}
                  <div className='hidden lg:flex items-center gap-10'>
                    <div onClick={redirectToLogin} className='text-lg px-2'>Login</div>
                    <button className='flex items-center gap-3 bg-secondary-200 hover:bg-green-700 px-3 py-3 rounded text-white'>
                      {/* add to cart icon */}
                      <div className='animate-bounce'>
                          <FaShoppingCart size={26} />
                      </div>
                      <div className='font-semibold'>
                          <p>My Cart </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>)
            }
        
        <div className='container mx-auto px-2 lg:hidden'>
          <Search/>
        </div>
      </header>
  )
}

export default Header
