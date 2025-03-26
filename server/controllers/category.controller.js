import CategoryModel from "../models/category.model.js";

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
        const {categoryId,name,image} = req.body

        const update = await CategoryModel.updateOne({
            _id : categoryId 
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