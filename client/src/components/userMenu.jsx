import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { LuExternalLink } from "react-icons/lu";
import isAdmin from '../utils/isAdmin'

const UserMenu = ({close}) => {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async()=>{
        try {
            const response = await Axios({
              ...SummaryApi.logout
            })
            if(response.data.success){
                if(close){
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                // window.history.back()
                navigate("/")
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleClose = ()=>{
        if(close){
            close()
        }
    }

  return (
    <div className='border-r-2'>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm flex items-center gap-2'>
            <span className='max-w-52 text-ellipsis line-clamp-1 '>{user.name || user.mobile} <span className='text-md text-red-600'>{user.role === "ADMIN" ? "(Admin)" : ""}</span> </span>
            <Link onClick={handleClose} to={"/dashboard/profile"}>
                <LuExternalLink size={15} className='hover:text-primary-200'/>
            </Link>
        </div>
        <Divider/>
        <div className=' text-sm grid gap-2 '>
            {
                isAdmin(user.role) && (
                    <Link onClick={handleClose}  to={"/dashboard/category"} className='px-2 py-1 hover:bg-green-200'>Category</Link>
                )
            }
            {
                isAdmin(user.role) && (
                    <Link onClick={handleClose}  to={"/dashboard/sub-category"} className='px-2 py-1 hover:bg-green-200'>Sub Category</Link>
                )
            }
            {
                isAdmin(user.role) && (
                    <Link onClick={handleClose}  to={"/dashboard/upload-product"} className='px-2 py-1 hover:bg-green-200'>Upload Product</Link>
                )
            }
            {
                isAdmin(user.role) && (
                    <Link onClick={handleClose}  to={"/dashboard/product"} className='px-2 py-1 hover:bg-green-200'>Products</Link>
                )
            }
            <Link onClick={handleClose}  to={"/dashboard/myorder"} className='px-2 py-1 hover:bg-green-200'>My Order</Link>
            <Link onClick={handleClose}  to={"/dashboard/address"} className='px-2 py-1 hover:bg-green-200'>Save Address</Link>
            <button onClick={handleLogout} className='bg-red-600 px-2 py-1 text-center border-black text-md text-white rounded-md hover:text-black hover:bg-slate-300'>Log Out</button>
            {/* <Link to={""}></Link> */}
        </div>
    </div>
  )
}

export default UserMenu
