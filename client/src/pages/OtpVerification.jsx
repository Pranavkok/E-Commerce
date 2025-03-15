import React, { useEffect, useState } from 'react'
// import { data } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
// import axios from 'axios' ;
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const OtpVerification = () => {
    const[data,setData]=useState(["","","","","",""])

    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])

    const validvalue = data.every(el => el)

    const handelSubmit=async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.verify_otp,
                data : {
                    otp : data.join(""),
                    email : location.state?.email
                }
            })
            if(response.data.error){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success(response.data.message)
                setData(["","","","","",""])
                navigate("/reset-password",{
                    state:{
                        data : response.data,
                        email : location.state?.email
                    }
                })
            }
            // console.log(response.data.message)
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
            <p className='text-xl font-semibold mb-3'>Enter OTP</p>
            <form action="" className='grid gap-4 mt-6' onSubmit={handelSubmit}>
                
                <div className='grid gap-1 '>
                    <label htmlFor="otp">Enter Your OTP : </label>
                    <div className='flex items-center gap-2 justify-between mt-3'>
                        {
                            data.map((element,index)=>{
                                return (<input 
                                    key={"otp"+index}
                                    type="text"
                                    id='otp'
                                    ref={(ref)=>{
                                        inputRef.current[index] = ref
                                        return ref
                                    }}  
                                    value={data[index]}
                                    onChange={(e)=>{
                                        const value = e.target.value;
                                        const newData = [...data];
                                        newData[index]=value ;
                                        setData(newData)
                                        if(value && index < 5){
                                            inputRef.current[index+1].focus()
                                        }
                                    }}
                                    maxLength={1}
                                    className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-bold'
                                />)
                            })
                        }
                    </div>
                </div>

                <button disabled={!validvalue} className={`${validvalue?"bg-green-800 hover:bg-green-600":"bg-gray-500"} py-2 text-white rounded font-semibold m-3 tracking-wide`}>Verify OTP</button>
            </form>
            <p>Already Have a Account ? <Link to={"/login"} className='text-green-600 hover:text-green-800 font-semibold'>Login</Link></p>
      </div>
    </section>
  )
}

export default OtpVerification

