import SubCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = async (req,res)=>{
    try {
        const {name, image, category} = req.body 

        if(!name || !image || !category || category.length === 0){
            return res.status(400).json({
                success : false,
                message : "All fields are required to add sub category",
                error : true 
            })
        }

        const playload = {
            name, image, category
        }

        const createSubCategory = new SubCategoryModel(playload)
        const save = await createSubCategory.save()

        return res.status(200).json({
            success : true,
            message : "Sub category added successfully",
            data : save,
            error : false 
        })

    } catch (error) {
        console.error("Error in adding sub category:", error)
        return res.status(500).json({
            success : false,
            message : "Error in adding sub category",
            error : true 
        })
    }
}

export const GetSubCategoryController = async (req,res)=>{
    try {
        const data = await SubCategoryModel.find().sort({createdAt : -1}).populate("category")
        return res.status(200).json({
            success : true,
            message : "Sub category fetched successfully",
            data : data ,
            error : false 
        })
    } catch (error) {
        console.error("Error in getting sub category:", error)
        return res.status(500).json({
            success : false,
            message : "Error in getting sub category",
            error : true 
        })
    }
}

export const UpdateSubCategoryController = async (req,res)=>{
    try {
        const {_id,name,image,category} = req.body ;
        const checkSub = await SubCategoryModel.findById(_id)
        if(!checkSub){
            return res.status(404).json({
                success : false,
                message : "Sub category not found",
                error : true 
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id,{
            name ,
            image,
            category
        })

        return res.status(200).json({
            success : true,
            message : "Sub category updated successfully",
            data : updateSubCategory,
            error : false 
        })

    } catch (error) {
        console.error("Error in editing sub category:", error)
        return res.status(500).json({
            success : false,
            message : "Error in editing sub category",
            error : true 
        })
    }
}

export const DeleteSubCategoryController = async (req,res)=>{
    try {
        const { _id } = req.body ;
        const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(_id)

        return res.status(200).json({
            success : true,
            message : "Sub category deleted successfully",
            data : deleteSubCategory,
            error : false 
        })
        
    } catch (error) {
        console.error("Error in deleting sub category:", error)
        return res.status(500).json({
            success : false,
            message : "Error in deleting sub category",
            error : true 
        })
    }
}