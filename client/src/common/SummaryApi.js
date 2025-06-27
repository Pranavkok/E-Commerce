// import { getProduct } from "../../../server/controllers/product.controller";

// import { updateProduct } from "../../../server/controllers/product.controller";

export const baseURL = "http://localhost:8080"

const SummaryApi = {
    register : {
        url : "/api/user/register",
        method : "post"
    },
    login : {
        url : "/api/user/login",
        method : "post"
    },
    forgot_password : {
        url : "/api/user/forgot-password",
        method : "put"
    },
    verify_otp : {
        url : "/api/user/verify-forgot-password-otp",
        method : "put"
    },
    reset_password : {
        url : "/api/user/reset-password",
        method : "put"
    },
    refresh_token : {
        url : "/api/user/refresh-token",
        method : "post"
    },
    userDetails : {
        url : "/api/user/user-details",
        method : "get"
    },
    logout : {
        url : "/api/user/logout",
        method : "get"
    },
    uploadAvatar : {
        url : "/api/user/upload-avatar",
        method : "put"
    },
    updateUser : {
        url : "/api/user/update-user",
        method : "put"
    },
    addCategory : {
        url : "/api/category/add-category",
        method : "post"
    },
    uploadImage : {
        url : "api/file/upload",
        method : "post"
    },
    getCategory : {
        url : "/api/category/get-category",
        method : "get"
    },
    updateCategory : {
        url : "/api/category/update-category",
        method : "put"
    },
    deleteCategory : {
        url : "/api/category/delete-category",
        method : "delete"
    },
    createSubCategory : {
        url : "/api/subcategory/create",
        method : "post"
    },
    getSubCategory : {
        url : "/api/subcategory/get",
        method : "post"
    },
    updateSubCategory : {
        url : "/api/subcategory/update",
        method : "put"
    },
    deleteSubCategory : {
        url : "/api/subcategory/delete",
        method : "delete"
    },
    createProduct : {
        url : "/api/product/add",
        method : "post"
    },
    getProduct : {
        url : "/api/product/get",
        method : "post"
    },
    getProductByCategory : {
        url : "/api/product/get-product-by-catid",
        method : "post"
    },
    getProductByCategoryAndSubCategory : {
        url : "/api/product/get-product-by-catid-and-subcatid",
        method : "post"
    },
    getProductById : {
        url : "/api/product/get-product-by-id",
        method : "post"
    },
    updateProduct : {
        url : "/api/product/update-product",
        method : "put"
    },
    deleteProduct : {
        url : "/api/product/delete-product",
        method : "delete"
    },
    searchProduct : {
        url : "/api/product/search-product",
        method : "post"
    },
    addToCart : {
        url : "/api/cart/create",
        method : "post"
    },
    getCartItem : {
        url : "/api/cart/get",
        method : "get"
    },
    updateCartItemQty : {
        url : "/api/cart/update-qty",
        method : "put"
    },
    deleteCartItem : {
        url : "/api/cart/delete-cart-item",
        method : "delete"
    },
    createAddress : {
        url : "/api/address/create-address",
        method : "post"
    }
}

export default SummaryApi ;