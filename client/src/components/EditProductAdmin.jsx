import React, { useState } from "react";
import { RiUpload2Line } from "react-icons/ri";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import AddField from "../components/AddField";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import successAlert from "../utils/successAlert.js";
import { IoClose } from "react-icons/io5";

const EditProductAdmin = ({ close ,data : propsData, fetchProductData }) => {
  const [data, setData] = useState({
    _id: propsData._id || "",
    name: propsData.name || "",
    image: propsData.image || [],
    category: propsData.category || [],
    subCategory: propsData.subCategory || [],
    unit: propsData.unit || "",
    stock: propsData.stock || "",
    price: propsData.price || "",
    discount: propsData.discount || "",
    description: propsData.description || "",
    more_details: propsData.more_details || {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const allcategory = useSelector((state) => state.product.allCategory);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    const ImageUrl = ImageResponse.data.url;

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, ImageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    setData((prev) => {
      const newImages = [...prev.image];
      newImages.splice(index, 1);
      return {
        ...prev,
        image: newImages,
      };
    });
  };

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
        category: [...prev.category, category],
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
        subCategory: [...prev.subCategory, subcategory],
      };
    });

    setSelectedSubCategory("");
  };

  const handleDeleteCategory = (categoryId) => {
    setData((prev) => ({
      ...prev,
      category: prev.category.filter((cat) => cat._id !== categoryId),
    }));
  };

  const handleDeleteSubCategory = (categoryId) => {
    setData((prev) => ({
      ...prev,
      subCategory: prev.subCategory.filter((cat) => cat._id !== categoryId),
    }));
  };

  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", data);

    try {
      const response = await Axios({
        ...SummaryApi.updateProduct,
        data: data,
      });

      const { data: responseData } = response;

      console.log("Response from server:", responseData);

      if (responseData.success) {
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
        if(close) close();
        fetchProductData();
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedImageUrl("");
        setFieldName("");
        setOpenAddField(false);

        successAlert("Product Created Successfully");
      }
    } catch (error) {
      toast.error("Failed to upload product");
      console.error("Error uploading product:", error);
    }
  };
  return (
    <section className="fixed top-0  h-full left-0 right-0 botton-0 bg-black z-50 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto max-h-[90vh] h-full">
        <section>
          <div className="p-2 bg-white shadow-md flex justify-between items-center">
            <h2 className="text-lg font-bold">Upload Product</h2>
            <button onClick={close}><IoClose size={25}/></button>
          </div>

          <div className="grid p-3">
            <form action="" onSubmit={handleSubmit}>
              <div className="grid gap-1">
                <label className="font-semibold" htmlFor="name">
                  Name{" "}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter product name "
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                />
              </div>
            </form>
          </div>

          <div className="grid p-3">
            <form action="" className="grid gap-2">
              <div className="grid gap-1">
                <label className="font-semibold" htmlFor="description">
                  Description{" "}
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter product description "
                  value={data.description}
                  onChange={handleChange}
                  required
                  multiple
                  rows={4}
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
                />
              </div>
            </form>
          </div>

          <div>
            <p className="font-semibold">Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="font-semibold bg-neutral-100 h-24 border rounded flex justify-center items-center"
              >
                <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <RiUpload2Line size={35} />
                      <p>Update Image</p>
                    </>
                  )}
                </div>
                <input
                  id="productImage"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleUploadImage}
                  className="hidden"
                />
              </label>
              {/* display uploaded images  */}
              <div className="my-2 flex flex-wrap gap-4">
                {data.image.map((img, index) => {
                  return (
                    <div
                      key={img + index}
                      className="h-20 w-20 min-w-20 bg-blue-50 border relative group"
                    >
                      <img
                        onClick={() => {
                          setSelectedImageUrl(img);
                        }}
                        src={img}
                        alt={img}
                        className="w-full h-full object-scale-down cursor-pointer"
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="absolute bottom-0 right-0 bg-red-400 text-white p-1 cursor-pointer hover:bg-red-600 hover:rounded-t-full hidden group-hover:block"
                      >
                        <MdOutlineDeleteForever size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="category">
              Category
            </label>
            <div>
              <select
                id="category"
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded w-full"
              >
                <option value="">Select Category</option>
                {allcategory.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.category.map((cat) => {
                  return (
                    <div
                      key={cat._id}
                      className="flex items-center gap-2 bg-blue-50 p-2 rounded"
                    >
                      <p>{cat.name}</p>
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdOutlineDeleteForever size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="category">
              Sub Category
            </label>
            <div>
              <select
                id="category"
                onChange={handleSubCategoryChange}
                value={selectedSubCategory}
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded w-full"
              >
                <option value="">Select Sub Category</option>
                {allSubCategory.map((subcategory) => {
                  return (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.subCategory.map((cat) => {
                  return (
                    <div
                      key={cat._id}
                      className="flex items-center gap-2 bg-blue-50 p-2 rounded"
                    >
                      <p>{cat.name}</p>
                      <button
                        onClick={() => handleDeleteSubCategory(cat._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdOutlineDeleteForever size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid p-3">
            <form action="">
              <div className="grid gap-1">
                <label className="font-semibold" htmlFor="unit">
                  Unit{" "}
                </label>
                <input
                  id="unit"
                  name="unit"
                  type="text"
                  placeholder="Enter product unit "
                  value={data.unit}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                />
              </div>
            </form>
          </div>

          <div className="grid p-3">
            <form action="">
              <div className="grid gap-1">
                <label className="font-semibold" htmlFor="stock">
                  Stock{" "}
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Enter product stock "
                  value={data.stock}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                />
              </div>
            </form>
          </div>

          <div className="grid p-3">
            <form action="">
              <div className="grid gap-1">
                <label className="font-semibold" htmlFor="price">
                  Price{" "}
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  placeholder="Enter product price "
                  value={data.price}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                />
              </div>
            </form>
          </div>

          <div className="grid p-3">
            <form action="">
              <div className="grid gap-1">
                <label className="font-semibold" htmlFor="discount">
                  Discount{" "}
                </label>
                <input
                  id="discount"
                  name="discount"
                  type="number"
                  placeholder="Enter product discount "
                  value={data.discount}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                />
              </div>
            </form>
          </div>

          {/* Add More Field  */}
          <div>
            {Object?.keys(data?.more_details)?.map((key, index) => {
              return (
                <div key={key + index} className="grid p-3">
                  <form action="">
                    <div className="grid gap-1">
                      <label className="font-semibold" htmlFor={key}>
                        {key}{" "}
                      </label>
                      <input
                        id={key}
                        name={key}
                        type="text"
                        placeholder={"Enter the " + key}
                        value={data.more_details[key]}
                        onChange={(e) => {
                          const value = e.target.value;
                          setData((prev) => {
                            return {
                              ...prev,
                              more_details: {
                                ...prev.more_details,
                                [key]: value,
                              },
                            };
                          });
                        }}
                        required
                        className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                      />
                    </div>
                  </form>
                </div>
              );
            })}
          </div>

          <div
            onClick={() => {
              setOpenAddField(true);
            }}
            className=" m-5 bg-primary-200 hover:bg-white py-2 px-2 w-32 text-center font-semibold border border-primary-200 rounded hover:text-neutral-900 cursor-pointer"
          >
            Add Field
          </div>

          <button
            onClick={handleSubmit}
            className="bg-primary-200 hover:bg-white py-2 px-4 w-full text-center font-semibold border border-primary-200 rounded hover:text-neutral-900 cursor-pointer"
          >
            Update
          </button>

          {selectedImageUrl && (
            <ViewImage
              url={selectedImageUrl}
              close={() => setSelectedImageUrl("")}
            />
          )}

          {openAddField && (
            <AddField
              close={() => {
                setOpenAddField(false);
              }}
              value={fieldName}
              onChange={(e) => {
                setFieldName(e.target.value);
              }}
              submit={handleAddField}
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default EditProductAdmin;
