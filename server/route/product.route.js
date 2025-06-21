import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProductByCategory, getProductByCategoryAndSubCategory,getProductById, searchProduct, updateProduct } from '../controllers/product.controller.js';
import auth from '../middleware/auth.js';
import { admin } from '../middleware/Admin.js';

const productRouter = Router();

productRouter.post('/add',auth,admin,createProduct)
productRouter.post('/get',auth,getProduct)
productRouter.post('/get-product-by-catid',getProductByCategory)
productRouter.post('/get-product-by-catid-and-subcatid',getProductByCategoryAndSubCategory)
productRouter.post('/get-product-by-id',getProductById)
productRouter.put('/update-product',auth,admin,updateProduct)
productRouter.delete('/delete-product',auth,admin,deleteProduct)
productRouter.post('/search-product',searchProduct)

export default productRouter;