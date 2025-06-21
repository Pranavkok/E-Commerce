import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import CardProduct from '../components/CardProduct'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noDataImage from '../assets/nothing here yet.webp'

const SearchPage = () => {

  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [page,setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const laodingArrayCard = new Array(15).fill(null)

  const fetchData = async()=>{
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data : {
          search : searchText ,
          page : page 
        }
      })

      const {data : responseData} = response 

      if(responseData.success){
        if(responseData.page === 1){
          setData(responseData.data)
        }else{
          setData((prev)=>{
            return [
              ...prev,
              ...responseData.data
            ]
          })
        }
        setTotalPage(responseData.totalPage)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[page,searchText])

  const handleFetchMore = ()=>{
    if(totalPage > page){
      setPage(prev => prev+1)
    }
  }

  return (
    <section className='bg-white'>
      <div className='mx-auto p-4 container overflow-x-hidden'>
        <p className='font-semibold'>Search Result : {data.length} </p>
        <InfiniteScroll
         dataLength={data.length}
         hasMore={true}
         next={handleFetchMore}
        >
        <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4'>
          {
            data.map((p,index)=>{
              return(
                <CardProduct data={p} key={p._id+index+"cardproduct"}/>
              )
            })
          }

          {/* Loading Data */}
          {
            loading && (
              laodingArrayCard.map((_,index)=>{
                return (
                  <CardLoading key={"LoadingSearchProduct" + index}/>
                )
              })
            )
          }
        </div>
        </InfiniteScroll>
        {
            // No data 
            !data[0] && !loading && (
              <div className=' flex flex-col justify-center items-center gap-3'>
                <img src={noDataImage} 
                className='w-full h-full max-w-sm max-h-sm' />
                <p className='font-semibold text-xl'>No Related Product Found </p>
              </div>
            )
        }
      </div>
    </section>
  )
}

export default SearchPage
