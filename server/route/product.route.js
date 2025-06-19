import { Router } from 'express';
import { createProduct, getProduct, getProductByCategory, getProductByCategoryAndSubCategory,getProductById } from '../controllers/product.controller.js';
import auth from '../middleware/auth.js';

const productRouter = Router();

productRouter.post('/add',auth,createProduct)
productRouter.post('/get',auth,getProduct)
productRouter.post('/get-product-by-catid',getProductByCategory)
productRouter.post('/get-product-by-catid-and-subcatid',getProductByCategoryAndSubCategory)
productRouter.post('/get-product-by-id',getProductById)

export default productRouter;