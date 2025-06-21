import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { IoMdArrowRoundBack } from "react-icons/io";
import useMobile from '../hooks/useMobile';

const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage,setSearchPage] = useState(false)
    const [isMobile] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)

    useEffect(()=>{
        const isSearch = location.pathname === "/search" ;
        setSearchPage(isSearch)
    },[location])

    // console.log("is serch page ->",isSearchPage)

    const redirectoSearchPage = ()=>{
        navigate("/search")
    }

    const handleOnChange = (e)=>{
        const value = e.target.value
        const url = `/search?q=${value}`
        navigate(url)
    }

  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>
        <div>           
            {
                (isMobile && isSearchPage)?
                (
                <Link to={"/"} className='flex justify-center items-center h-full p-1 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md'>
                    <IoMdArrowRoundBack size={22}/>
                </Link>
                )
                :
                (
                <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>  
                    <FaSearch size={22} />
                </button>
                )
            }           
        </div>
        <div>
            {
                (!isSearchPage)?(
                    // Not inside the search Page
                    <div onClick={redirectoSearchPage} className='w-full h-full flex items-center'>
                        <TypeAnimation
                        sequence={[
                            'Search "milk"', 
                            1000, // Waits 1s
                            'Search "bread"',
                            1000, // Waits 1s
                            'Search "sugar"', 
                            1000, // Waits 1s
                            'Search "paneer"', 
                            1000, // Waits 1s
                            'Search "chocolate"', 
                            1000, // Waits 1s
                            'Search "curd"', 
                            1000, // Waits 1s
                            'Search "rice"', 
                            1000, // Waits 1s
                            'Search "chips"', 
                            1000, // Waits 1s
                            'Search "eggs"', 
                            1000, // Waits 1s
                            'Search "fruits"', 
                            1000, // Waits 1s
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                        style={{ fontSize: '1em', display: 'inline-block' }}
                        />
                    </div>
                ):(
                     // Inside the search Page 
                    <div>
                        <input type='text'
                            placeholder='Search for atta dal and more.'
                            autoFocus
                            defaultValue={searchText}
                            className='bg-transparent w-full h-full outline-none'
                            onChange={handleOnChange} 
                            />
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Search
