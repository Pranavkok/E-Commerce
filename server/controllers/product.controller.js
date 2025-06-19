import ProductModel from "../models/product.model.js";

export const createProduct = async(req,res)=>{
    try {
        const { name, image, category, subCategory, unit, stock, price, discount, description, more_details } = req.body;

        if( !name || !category[0] || !subCategory[0] || !unit || !price || !description) {
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
                .limit(limit),
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
