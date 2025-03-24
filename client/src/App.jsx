import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import  { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetail } from './store/userSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()

  const fetchUser = async()=>{
      const userData = await fetchUserDetails()
      dispatch(setUserDetail(userData.data))
  }

  useEffect(async()=>{
    fetchUser()
  },[])

  return (
    <>
      <Header/>
      <main className='min-h-[78vh]'>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App

