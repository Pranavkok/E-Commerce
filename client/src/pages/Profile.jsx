import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';

const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
    console.log(user)
  return (
    <div>
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
    </div>
  )
}

export default Profile
