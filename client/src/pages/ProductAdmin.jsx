import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import Loading from '../components/Loading';
import ProductCardAdmin from '../components/ProductCardAdmin';
import { IoSearch } from "react-icons/io5";
import EditProductAdmin from '../components/EditProductAdmin';

const ProductAdmin =() => {
      const [productData, setProductData] = useState([]);
      const [page,setPage] = useState(1);
      const [loading,setLoading] = useState(false);
      const [totalPages,setTotalPages] = useState(1);
      const [search,setSearch] = useState("");
      const [debouncedSearch, setDebouncedSearch] = useState("");

      // Debounce search input
      useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
      }, [search]);

      const fetchProductData = async()=>{
          try {
              setLoading(true);
              const response = await Axios({
                  ...SummaryApi.getProduct,
                  data : {
                      page: page,
                      limit:3,
                      search: debouncedSearch
                  }
              })
              const {data : responseData} = response 
              if(responseData.success){
                setTotalPages(responseData.totalNoPages)
                setProductData(responseData.data);
                toast.success("Product data fetched successfully");
              }
          } catch (error) {
              toast.error("Something went wrong while fetching product data");
              console.error("Error fetching product data:", error);
          }
          finally {
              setLoading(false);
          }
      }

      useEffect(()=>{
          fetchProductData();
      },[page, debouncedSearch])

      const handleNext = () => {
        setPage((prev)=>{
            if(prev < totalPages){
                return prev + 1;
            } else {
                return prev;
            }
        })
      }

      const handlePrevious = () => {
        setPage((prev)=>{
            if(prev > 1){
                return prev - 1;
            } else {
                return prev;
            }
        })
      }

      const handleOnChange = (e) => {
        const {value} = e.target;
        setSearch(value);
        setPage(1); // Reset to first page when searching
      }
      
      return (
        <section>
          <div className='p-2 bg-blue-white shadow-md flex justify-between items-center gap-4'>
                <h2 className='text-lg font-bold'>Upload Product</h2>
                <div className='min-w-24 max-w-60 w-full ml-auto h-full bg-blue-50 px-4 flex items-center gap-3 py-2 border focus-within:border-primary-200 rounded-md'>
                    <IoSearch size={20}/>
                    <input 
                    value={search}
                    onChange={handleOnChange} 
                    className='w-full h-full bg-transparent outline-none' 
                    type="text" 
                    placeholder='Search Product...'/>
                </div>
          </div>
          {
            loading && <Loading/>
          }
          <div className='p-4'>
            <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2 '>
            {
                productData.map((p)=>{
                    return (
                        <ProductCardAdmin  fetchProductData={ fetchProductData } key={p._id} data={p}/>
                    )
                })
            }
            </div>
            <div className='flex justify-between items-center p-2 my-2'>
                <button onClick={handlePrevious} className=' px-4 py-1 hover:bg-primary-200 border border-primary-200 rounded-md' >
                    previous
                </button>
                <button className='bg-white w-full text-center px-4 py-1' >
                    {page}/{totalPages}
                </button>
                <button onClick={handleNext} className=' px-4 py-1 hover:bg-primary-200 border border-primary-200 rounded-md' >
                    next 
                </button>
            </div>
          </div>
        </section>
      )
}

export default ProductAdmin
