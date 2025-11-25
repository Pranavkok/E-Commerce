import axios from 'axios';
import SummaryApi, { baseURL } from '../common/SummaryApi';

const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true 
})

Axios.interceptors.request.use(
    async(config)=>{
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);



export default Axios 