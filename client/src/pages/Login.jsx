import React, { useState } from 'react'
// import { data } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
// import axios from 'axios' ;
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../store/userSlice';

const Login = () => {
    const[data,setData]=useState({
        email : "",
        password : ""
    })
    const[showPassword,setShowPassword]=useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e)=>{
        const{name,value} = e.target
        setData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const validvalue = Object.values(data).every(el => el)

    const handelSubmit=async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : data
            })
            if(response.data.error){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success(response.data.message)
                const userDetails = await fetchUserDetails()
                dispatch(setUserDetail(userDetails.data))
                setData({
                    email : "",
                    password : ""
                })
                navigate("/")
            }
            console.log(response.data.message)
        } catch (error) {
            // AxiosToastError(error)
            toast.error(error?.response.data.message)
        }
        // console.log(response.data.message)
        // toast.success(response.data.message)
        // console.log("<- Response is here ",response)
    }

    console.log(data)
  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 text-lg'>
            <p>Welcome to BlinkeyIt</p>
            <form action="" className='grid gap-4 mt-6' onSubmit={handelSubmit}>
                
                <div className='grid gap-1 '>
                    <label htmlFor="email">Email : </label>
                    <input 
                    
                    type="email"
                    id='email'
                    className='bg-blue-50  p-2 border rounded outline-none focus:border-primary-200'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    placeholder='Enter your Email'
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor="password">Password : </label>
                    <div className='bg-blue-50  p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input 
                        type={showPassword?"text":"password"}
                        id='password'
                        className='w-full outline-none'
                        name='password'
                        placeholder='Enter your Password'
                        value={data.password}
                        onChange={handleChange}
                        />
                        <div onClick={()=>setShowPassword((prev)=>!prev)} className='cursor-pointer'>
                        {
                            showPassword?(<FaEye />):(<FaEyeSlash />)
                        }
                        </div>
                    </div>    
                    <Link to={'/forgot-password'} className='block ml-auto hover:text-secondary-200'>Forgot Password ?</Link>         
                </div>

                <button disabled={!validvalue} className={`${validvalue?"bg-green-800 hover:bg-green-600":"bg-gray-500"} py-2 text-white rounded font-semibold m-3 tracking-wide`}>Login</button>
            </form>
            <p>Don't Have a Account ? <Link to={"/register"} className='text-green-600 hover:text-green-800 font-semibold'>Register</Link></p>
      </div>
    </section>
  )
}

export default Login
