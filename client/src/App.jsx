import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import  toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetail } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { setAllCategory , setAllSubCategory ,setloadingCategory } from './store/productSlice';
import SummaryApi from './common/SummaryApi';
import Axios from './utils/Axios';
// import { handleAddItemCart } from './store/cartProduct'
import GlobalProvider from './provider/GlobalProvider';
import { FaCartShopping } from "react-icons/fa6";
import CartMobileLink from './components/cartMobile';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  const fetchUser = async()=>{
      const userData = await fetchUserDetails()
      dispatch(setUserDetail(userData.data))
  }

    const fetchCategory = async ()=>{
        try {
          dispatch(setloadingCategory(true))
            const response = await Axios ({
                ...SummaryApi.getCategory
            })
            const {data : responseData} = response
            if(responseData.success){
              // console.log("Hey dudeeee "+responseData.data)
              dispatch(setAllCategory(responseData.data))
            }
            console.log(responseData)
            // console.log(categoryData)
        } catch (error) {
            toast.error(error.message)
        }finally{
            // setLoading(false)
            dispatch(setloadingCategory(false))
        }
    }

    const fetchSubCategory = async ()=>{
      try {
          const response = await Axios ({
              ...SummaryApi.getSubCategory
          })
          const {data : responseData} = response
          if(responseData.success){
            // console.log("Hey dudeeee "+responseData.data)
            dispatch(setAllSubCategory(responseData.data))
          }
          console.log(responseData)
          // console.log(categoryData)
      } catch (error) {
          toast.error(error.message)
      }finally{
          // setLoading(false)
      }
  }

  useEffect(async()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  },[])

  return (
    <GlobalProvider>
      <Header/>
      <main className='min-h-[78vh]'>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
    </GlobalProvider>
  )
}

export default App

