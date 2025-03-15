import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [data,setData] = useState({
        email : "",
        newpassword : "",
        confirmpassword : ""
    });
    console.log(location);

    useEffect(()=>{
        if(!location?.state?.data?.success){
            navigate("/forgot-password")
        }
        if(location?.state?.email){
            setData((prev)=>{
                return {
                    ...prev ,
                    email : location?.state?.email  
                }        
            })
        }
    },[])

    const validvalue = Object.values(data).every(el => el)

    const handleChange = (e)=>{
        const {name,value} = e.target 
        setData((prev)=>({
            ...prev,
            [name] : value
        }))
    }

    const handelSubmit=async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.reset_password,
                data : data
            })
            if(response.data.error){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success(response.data.message)
                navigate("/login")
                setData({
                    email : "",
                    newpassword : "",
                    confirmpassword : ""
                })
            }
            console.log(response.data.message)
        } catch (error) {
            toast.error(error?.response.data.message)
        }
    }

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 text-lg'>
            <p className='text-xl font-semibold mb-3'>Enter your new Password</p>
            <form action="" className='grid gap-4 mt-6' onSubmit={handelSubmit}>
                
                <div className='grid gap-1'>
                    <label htmlFor="new password">New Password : </label>
                    <div className='bg-blue-50  p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input 
                        type={showPassword?"text":"password"}
                        id='password'
                        className='w-full outline-none'
                        name='newpassword'
                        placeholder='Enter new Password'
                        value={data.newpassword}
                        onChange={handleChange}
                        />
                        <div onClick={()=>setShowPassword((prev)=>!prev)} className='cursor-pointer'>
                        {
                            showPassword?(<FaEye />):(<FaEyeSlash />)
                        }
                        </div>
                    </div>          
                </div>
                <div className='grid gap-1'>
                    <label htmlFor="Confirmpassword">Confirm Password : </label>
                    <div className='bg-blue-50  p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input 
                        type={showConfirmPassword?"text":"password"}
                        id='password'
                        className='w-full outline-none'
                        name='confirmpassword'
                        placeholder='Enter confirm Password'
                        value={data.confirmpassword}
                        onChange={handleChange}
                        />
                        <div onClick={()=>setShowConfirmPassword((prev)=>!prev)} className='cursor-pointer'>
                        {
                            showConfirmPassword?(<FaEye />):(<FaEyeSlash />)
                        }
                        </div>
                    </div>          
                </div>

                <button disabled={!validvalue} className={`${validvalue?"bg-green-800 hover:bg-green-600":"bg-gray-500"} py-2 text-white rounded font-semibold m-3 tracking-wide`}>Change Password</button>
            </form>
            <p>Already Have a Account ? <Link to={"/login"} className='text-green-600 hover:text-green-800 font-semibold'>Login</Link></p>
      </div>
    </section>
  )
}

export default ResetPassword
