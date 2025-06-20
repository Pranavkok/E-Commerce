import ProductModel from "../models/product.model.js";

export const createProduct = async(req,res)=>{
    try {
        const { name, image, category, subCategory, unit, stock, price, discount, description, more_details } = req.body;

        if( !name || !category[0] || !subCategory[0] || !unit || !price || stock === undefined || stock === null || !description) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const newProduct = new ProductModel({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        });
        const savedProduct = await newProduct.save();
        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            error: false ,
            product: savedProduct
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
            error: true
        });
    }
}

export const getProduct = async(req,res)=>{
    try {
        let {page,limit,search} = req.body

        if(!page){
            page = 1
        }
        if(!limit){
            limit = 10 
        }

        // Create search query
        const query = search ? {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        } : {}

        const skip = (page - 1) * limit;
        
        const [data,countData] = await Promise.all([
            ProductModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return res.status(200).json({
            message: "products fetched successfully",
            success: true,
            error: false,
            totalCount: countData,
            totalNoPages: Math.ceil(countData/limit),
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
            error: true
        });
    }
}

export const getProductByCategory = async(req,res)=>{
    try {
        const { id } = req.body;

        if(!id){
            return res.status(400).json({
                message: "Category ID is required",
                success: false,
                error: true
            });
        }

        const product = await ProductModel.find({
            category: { $in: [id] }
        }).sort({ createdAt: -1 }).limit(15);

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            error: false,
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
            error: true
        });
    }
}

export const getProductByCategoryAndSubCategory = async(req,res)=>{
    try {
        const { categoryId, subCategoryId ,page ,limit} = req.body;
        if(!categoryId || !subCategoryId){
            return res.status(400).json({
                message: "Category ID and SubCategory ID are required",
                success: false,
                error: true
            });
        }
        if(!page){
            page = 1
        }
        if(!limit){
            limit = 10 
        }

        const query = {
            category: { $in: categoryId },
            subCategory: { $in: subCategoryId }
        };

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
        ])

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            error: false,
            totalCount: dataCount,
            totalNoPages: Math.ceil(dataCount/limit),
            data: data,
            page: page,
            limit: limit
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
            error: true
        });
    }
}

export const getProductById = async(req,res)=>{
    try {
        const { productId } = req.body;

        const data = await ProductModel.findById(productId);

        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            error: false,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
            error: true
        });
    }
}

export const updateProduct = async(req,res)=>{
    try {
        const {_id} = req.body;

        if(!_id){
            return res.status(400).json({
                message: "Product ID is required",
                success: false,
                error: true
            });
        }

        const updateProduct = await ProductModel.updateOne({_id:_id},{
            ...req.body
        })

        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            error: false,
            data: updateProduct
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
            error: true
        });
    }
}

export const deleteProduct =async(req,res)=>{
    try {
        const {_id} = req.body

        if(!_id){
            return res.status(400).json({
                message :"Provide Product Id" ,
                success : false ,
                error : true 
            })
        }

        const deleteProduct = await ProductModel.deleteOne({_id : _id})

        return res.status(200).json({
            message : "Product Deleted Successfully",
            success : true ,
            error : false ,
            data: deleteProduct
        })

    } catch (error) {
        return res.status(500).json({
            message :" Internal Server Error" ,
            success : false ,
            error : true 
        })
    }
}