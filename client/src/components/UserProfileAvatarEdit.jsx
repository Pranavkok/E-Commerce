import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { updateAvatar } from '../store/userSlice'
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'

const UserProfileAvatarEdit = ({close}) => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading ,setLoading] = useState(false)

    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }
        const formData = new FormData()
        formData.append('avatar',file)

        try {
            setLoading(true)
            const response = await Axios(
                {...SummaryApi.uploadAvatar,
                    data : formData
                }
            )
            const {data : responseData} = response
            dispatch(updateAvatar(responseData.data.avatar))
            console.log(response)
        } catch (error) {
            AxiosToastError(error)
        }
        finally{
        setLoading(false)
        }
    }
  return (
    <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-900 bg-opacity-65 p-4 flex justify-center items-center'>
        <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
            <button onClick={()=>navigate('../')} className='text-neutral-800 w-fit block ml-auto'>
                <IoClose size={20} />
            </button>
            <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden'>
                {
                    user.avatar? (
                    <img src={user.avatar} alt={user.name} className='w-full h-full'/>
                    ):(
                    <FaUserCircle size={80}/>
                    )
                }
            </div>
            <form onSubmit={(e)=>e.preventDefault()} action="">
                <label htmlFor="uploadProfile">
                    <div className=' border border-primary-100 hover:bg-primary-200 px-4 py-1 rounded my-3 text-sm cursor-pointer'>
                        {
                            loading ? "Loading..." : "Upload"
                        }
                    </div>
                </label>
                <input onChange={handleUploadAvatarImage} type="file" id='uploadProfile' className='hidden'/>
            </form>

        </div>
    </section>
  )
}

export default UserProfileAvatarEdit
