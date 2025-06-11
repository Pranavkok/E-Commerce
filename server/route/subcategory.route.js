import { Router } from "express";
import { AddSubCategoryController, DeleteSubCategoryController, GetSubCategoryController, UpdateSubCategoryController } from "../controllers/subcategory.controller.js";
import auth from "../middleware/auth.js";

const subCategoryRouter = Router()

subCategoryRouter.post('/create',auth ,AddSubCategoryController)
subCategoryRouter.post('/get',GetSubCategoryController)
subCategoryRouter.put('/update',auth ,UpdateSubCategoryController)
subCategoryRouter.delete('/delete',auth ,DeleteSubCategoryController)

export default subCategoryRouter