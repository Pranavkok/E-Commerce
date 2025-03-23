import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetail } from '../store/userSlice';

const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
    const [userData,setUserData] = useState({
      name : user.name ,
      email : user.email ,
      mobile : user.mobile 
    })
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
      setUserData(({
        name : user.name ,
        email : user.email ,
        mobile : user.mobile 
      }))
    },[user])

    console.log(user)

    const handleOnChange = (e)=>{
      const {name,value} = e.target
      setUserData((prev)=>{
        return {
          ...prev,
          [name] : value
        }
      })
    }

    const handleSubmit = async(e)=>{
      e.preventDefault()
      try {
        setLoading(true)
        const response = await Axios({
          ...SummaryApi.updateUser,
          data : userData
        })
        const {data : responseData} = response

        if(responseData.success){
          toast.success(responseData.message)
            const userData = await fetchUserDetails()
            dispatch(setUserDetail(userData.data))
        }
      } catch (error) {
        AxiosToastError(error)
      }
      finally{
        setLoading(false)
      }
    }

  return (

    <div>
      {/* Profile Upload and display image  */}
      <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden'>
        {
          user.avatar? (
            <img src={user.avatar} alt={user.name} className='w-full h-full'/>
          ):(
            <FaUserCircle size={80}/>
          )
        }
      </div>
      <button onClick={()=>setProfileAvatarEdit(true)} className='text-sm min-w-20 border-primary-100 hover:bg-primary-200 border px-3 py-1 rounded-full mt-3'>Edit </button>
      
      
      {
        openProfileAvatarEdit && (
          <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)}/>

        )
      }

      {/* name , email , mobile display and change password  */}
      <form action="" className='my-4 grid gap-4' onSubmit={handleSubmit}>
        <div className='grid'>
          <label htmlFor="name">Name : </label>
          <input required name='name' type="text" value={userData.name} onChange={handleOnChange} placeholder='Enter your Name' className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded ' />
        </div>
        <div className='grid'>
          <label htmlFor="email">Email : </label>
          <input required name='email' type="email" value={userData.email} onChange={handleOnChange} placeholder='Enter your Email' className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded ' />
        </div>
        <div className='grid'>
          <label htmlFor="mobile">Mobile : </label>
          <input required name='mobile' type="text" value={userData.mobile} onChange={handleOnChange} placeholder='Enter your Mobile Number' className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded ' />
        </div>

        <button className='border px-4 py-2 font-semibold  block hover:bg-primary-200 border-primary-200 rounded '>
          {
            loading?"Loading...":"Submit"
          }
        </button>
      </form>
    </div>
  )
}

export default Profile
