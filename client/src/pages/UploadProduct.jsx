import React, { useState } from 'react'
import { RiUpload2Line } from "react-icons/ri";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdOutlineDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';

const UploadProduct = () => {
  const [data,setData] = useState({
    name : "",
    image : [],
    category : [],
    subCategory  : [],
    unit : "",
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {}
  })
  const [imageLoading,setImageLoading] = useState(false)
  const [selectedImageUrl,setSelectedImageUrl] = useState("")
  const allcategory = useSelector((state)=>state.product.allCategory)
  const [selectedCategory,setSelectedCategory] = useState("")
  const [selectedSubCategory,setSelectedSubCategory] = useState("")
  const allSubCategory = useSelector((state)=>state.product.allSubCategory)
  const [moreField,setMoreField] = useState([])

  const handleChange = (e)=>{
    const {name,value} = e.target 
    setData((prev)=>{
      return {
        ...prev,[name]:value
      }
    })
  }

  const handleUploadImage = async(e)=>{
    const file = e.target.files[0];
    if(!file){
      return;
    }
    setImageLoading(true)
    const response = await uploadImage(file)
    const {data : ImageResponse} = response

    const ImageUrl = ImageResponse.data.url

    setData((prev)=>{
      return{
        ...prev,
        image : [...prev.image, ImageUrl]
      }
    })
    setImageLoading(false)
  }

  const handleDeleteImage = async(index)=>{
    setData((prev)=>{
      const newImages = [...prev.image];
      newImages.splice(index, 1);
      return {
        ...prev,
        image: newImages
      }
    })
  }

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    if (!categoryId) return;

    const category = allcategory.find((cat) => cat._id === categoryId);
    if (!category) return;

    setData((prev) => {
      // Check if category already exists
      const exists = prev.category.some((cat) => cat._id === category._id);
      if (exists) return prev;

      return {
        ...prev,
        category: [...prev.category, category]
      };
    });

    setSelectedCategory("");
  };

  const handleSubCategoryChange = (e) => {
    const categoryId = e.target.value;
    if (!categoryId) return;

    const subcategory = allSubCategory.find((cat) => cat._id === categoryId);
    if (!subcategory) return;

    setData((prev) => {
      // Check if category already exists
      const exists = prev.category.some((cat) => cat._id === subcategory._id);
      if (exists) return prev;

      return {
        ...prev,
        subCategory: [...prev.subCategory, subcategory]
      };
    });

    setSelectedSubCategory("");
  };

  const handleDeleteCategory = (categoryId) => {
    setData((prev) => ({
      ...prev,
      category: prev.category.filter((cat) => cat._id !== categoryId)
    }));
  };

  const handleDeleteSubCategory = (categoryId) => {
    setData((prev) => ({
      ...prev,
      subCategory: prev.subCategory.filter((cat) => cat._id !== categoryId)
    }));
  };

  return (
    <section>
        <div className='p-2 bg-white shadow-md flex justify-between items-center'>
            <h2 className='font-semibold'>Upload Product</h2>
        </div>

        <div className='grid p-3'>
          <form action="">
            <div className='grid gap-1'>
              <label htmlFor="name">Name </label>
              <input
              id='name'
               name = "name"
               type="text" 
               placeholder='Enter product name '
               value = {data.name}
               onChange={handleChange}
               required
               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded '
               />
            </div>
          </form>
        </div>

        <div className='grid p-3'>
          <form action="" className='grid gap-2'>
            <div className='grid gap-1'>
              <label htmlFor="description">Description </label>
              <textarea
              id='description'
               name = "description"
               type="text" 
               placeholder='Enter product description '
               value = {data.description}
               onChange={handleChange}
               required
               multiple 
               rows={4}
               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
               />
            </div>
          </form>
        </div>

        <div>
          <p>Image</p>
          <div >
            
            <label htmlFor='productImage' className='bg-neutral-100 h-24 border rounded flex justify-center items-center'>
              <div className='flex flex-col justify-center items-center gap-2 cursor-pointer'>
                {imageLoading ? <Loading/> : (
                  <>
                    <RiUpload2Line size={35}/>
                    <p>Upload Image</p>
                  </>
                )}
              </div>
              <input 
                id='productImage'
                type="file" 
                name='image' 
                accept='image/*' 
                onChange={handleUploadImage}
                className='hidden'
              />
            </label>
            {/* display uploaded images  */}
            <div className='my-2 flex flex-wrap gap-4'>
              {
                data.image.map((img,index) => {
                    return (
                      <div key={img+index} className='h-20 w-20 min-w-20 bg-blue-50 border relative group'>
                        <img
                          onClick={()=>{setSelectedImageUrl(img)}}
                          src={img} alt={img} className='w-full h-full object-scale-down cursor-pointer'/>
                        <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 bg-red-400 text-white p-1 cursor-pointer hover:bg-red-600 hover:rounded-t-full hidden group-hover:block'>
                          <MdOutlineDeleteForever size={20} />
                        </div>
                      </div>
                    )
                })
              }
            </div>

          </div>
        </div>

        <div className='grid gap-1'>
          <label htmlFor="category">Category</label>
          <div>
            <select 
              id="category"
              onChange={handleCategoryChange}
              value={selectedCategory}  
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded w-full'>
              <option value="">Select Category</option>
              {
                allcategory.map((category)=>{
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  )
                })
              }
            </select>
            <div className='flex flex-wrap gap-2 mt-2'>
              {
                data.category.map((cat)=>{
                  return (
                    <div key={cat._id} className='flex items-center gap-2 bg-blue-50 p-2 rounded'>
                      <p>{cat.name}</p>
                      <button 
                        onClick={() => handleDeleteCategory(cat._id)}
                        className='text-red-500 hover:text-red-700'
                      >
                        <MdOutlineDeleteForever size={20} />
                      </button>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

        <div className='grid gap-1'>
          <label htmlFor="category">Sub Category</label>
          <div>
            <select 
              id="category"
              onChange={handleSubCategoryChange}
              value={selectedSubCategory}  
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded w-full'>
              <option value="">Select Sub Category</option>
              {
                allSubCategory.map((subcategory)=>{
                  return (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  )
                })
              }
            </select>
            <div className='flex flex-wrap gap-2 mt-2'>
              {
                data.subCategory.map((cat)=>{
                  return (
                    <div key={cat._id} className='flex items-center gap-2 bg-blue-50 p-2 rounded'>
                      <p>{cat.name}</p>
                      <button 
                        onClick={() => handleDeleteSubCategory(cat._id)}
                        className='text-red-500 hover:text-red-700'
                      >
                        <MdOutlineDeleteForever size={20} />
                      </button>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

        <div className='grid p-3'>
          <form action="">
            <div className='grid gap-1'>
              <label htmlFor="unit">Unit </label>
              <input
              id='unit'
               name = "unit"
               type="text" 
               placeholder='Enter product unit '
               value = {data.unit}
               onChange={handleChange}
               required
               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded '
               />
            </div>
          </form>
        </div>

        <div className='grid p-3'>
          <form action="">
            <div className='grid gap-1'>
              <label htmlFor="stock">Stock </label>
              <input
              id='stock'
               name = "stock"
               type="number" 
               placeholder='Enter product stock '
               value = {data.stock}
               onChange={handleChange}
               required
               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded '
               />
            </div>
          </form>
        </div>

        <div className='grid p-3'>
          <form action="">
            <div className='grid gap-1'>
              <label htmlFor="price">Price </label>
              <input
              id='price'
               name = "price"
               type="text" 
               placeholder='Enter product price '
               value = {data.price}
               onChange={handleChange}
               required
               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded '
               />
            </div>
          </form>
        </div>

        <div className='grid p-3'>
          <form action="">
            <div className='grid gap-1'>
              <label htmlFor="discount">Discount </label>
              <input
              id='discount'
               name = "discount"
               type="text" 
               placeholder='Enter product discount '
               value = {data.discount}
               onChange={handleChange}
               required
               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded '
               />
            </div>
          </form>
        </div>

        {/* Add More Field  */}
        <div className=' bg-primary-200 hover:bg-white py-1 px-2 w-32 text-center font-semibold border border-primary-200 rounded hover:text-neutral-900 cursor-pointer'>
          Add Field
        </div>

        {
          selectedImageUrl && (
            <ViewImage url={selectedImageUrl} close={()=>setSelectedImageUrl("")}/>
          )
        }
    </section>
  )
}

export default UploadProduct
