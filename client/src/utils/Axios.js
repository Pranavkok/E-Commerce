import axios from 'axios';
import SummaryApi, { baseURL } from '../common/SummaryApi';

const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true 
})

Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem('accesstoken')
        if(accessToken){
            config.headers.authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
Axios.interceptors.response.use(
    (response) => {
        return response; // Return the response as is
    },
    async (error) => {  // Handle errors (like expired tokens)
        let originRequest = error.config;

        if (error.response && error.response.status === 401 && !originRequest.retry) {
            originRequest.retry = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                const newAccessToken = await refreshaccesstoken(refreshToken);
                if (newAccessToken) {
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originRequest);  // Retry request with new token
                }
            }
        }

        return Promise.reject(error);
    }
);

const refreshaccesstoken = async(refreshToken)=>{
    try {
        const response = await Axios({
            ...SummaryApi.refresh_token,
            headers : {
                Authorization: `Bearer ${refreshToken}`
            }
        })
        console.log("refreshed AccessToken Response -> ",response)
    } catch (error) {
        console.log(error);
    }
}

export default Axios 