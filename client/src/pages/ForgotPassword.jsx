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

const ForgotPassword = () => {
    const[data,setData]=useState({
        email : ""
    })

    const navigate = useNavigate()

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
                ...SummaryApi.forgot_password,
                data : data
            })
            if(response.data.error){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verification-otp",{
                    state : data
                })
                setData({
                    email : ""
                })
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
            <p className='text-xl font-semibold mb-3'>Forgot Password ?</p>
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

                <button disabled={!validvalue} className={`${validvalue?"bg-green-800 hover:bg-green-600":"bg-gray-500"} py-2 text-white rounded font-semibold m-3 tracking-wide`}>Send OTP</button>
            </form>
            <p>Already Have a Account ? <Link to={"/login"} className='text-green-600 hover:text-green-800 font-semibold'>Login</Link></p>
      </div>
    </section>
  )
}

export default ForgotPassword

