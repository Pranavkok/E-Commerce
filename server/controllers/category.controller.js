import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

export async function AddCategoryController(req,res){
    try {
        const {name,image} = req.body

        if(!name || !image){
            return res.status(400).json({
                message : "Provide required fileds i.e Name and Image",
                error : true ,
                success : false
            })
        }

        const addCategory = new CategoryModel({
            name , 
            image
        })

        const saveCategory = await addCategory.save()

        if(!saveCategory){
            return res.status(500).json({
                message : "Not Created ",
                error : true ,
                success : false
            })
        }

        return res.json({
            message : "Added Catgeory Successfully",
            data : saveCategory,
            error : false ,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true ,
            success : false
        })
    }
}

export async function GetCategoryController(req,res){
    try {
        const data = await CategoryModel.find()

        return res.json({
            data : data ,
            error : false ,
            success : true 
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error ,
            success : false ,
            error : true 
        })
    }
}

export async function UpdateCategoryController(req,res){
    try {
        const {_id,name,image} = req.body

        const update = await CategoryModel.updateOne({
            _id : _id 
        },{
            name ,
            image
        })

        return res.json({
            message : "Updated Category",
            success : true ,
            error : false ,
            data : update
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error ,
            success : false ,
            error : true 
        })
    }
}

export async function DeleteCategoryController(req,res){
    try {
        const {_id} = req.body 

        const checkSubCategory = await SubCategoryModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

        const checkProduct = await ProductModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

        if(checkProduct > 0 || checkSubCategory > 0){
            return res.status(400).json({
                message : "Category is already in use",
                success : false ,
                error : true 
            })
        }

        const deleteCategory = await CategoryModel.deleteOne({_id : _id})

        return res.json({
            message : "Delete Category Successfully",
            success : true ,
            error : false
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error ,
            success : false ,
            error : true 
        })
    }
}