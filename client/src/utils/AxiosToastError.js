import toast from "react-hot-toast";
// import axios from 'axios';

const AxiosToastError = (error)=>{
    toast.error(error?.response.data.message)
}

export default AxiosToastError