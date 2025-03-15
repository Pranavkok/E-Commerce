import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const UserMenu = ({close}) => {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const handleLogout = async()=>{
        try {
            const response = await Axios({
              ...SummaryApi.logout
            })
            if(response.data.success){
                close()
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm'>{user.name || user.mobile}</div>
        <Divider/>
        <div className=' text-sm grid gap-2 '>
            <Link to={""} className='px-2 py-1 hover:bg-green-200'>My Order</Link>
            <Link to={""} className='px-2 py-1 hover:bg-green-200'>Save Address</Link>
            <button onClick={handleLogout} className='bg-red-600 px-2 py-1 text-center border-black text-md text-white rounded-md hover:text-black hover:bg-slate-300'>Log Out</button>
            {/* <Link to={""}></Link> */}
        </div>
    </div>
  )
}

export default UserMenu
