import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage,setSearchPage] = useState(false)

    useEffect(()=>{
        const isSearch = location.pathname === "/search" ;
        setSearchPage(isSearch)
    },[location])

    console.log("is serch page ->",isSearchPage)

    const redirectoSearchPage = ()=>{
        navigate("/search")
    }

  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50'>
        <button className='flex justify-center items-center h-full p-3'>  
            <FaSearch size={22} />
        </button>

        <div>
            {
                (!isSearchPage)?(
                    // Not inside the search Page
                    <div onClick={redirectoSearchPage}>
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
                        <input type="text" className='' placeholder='Search for Atta, Dal and more.' />
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Search
