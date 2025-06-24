import cartProductModel from "../models/cartproduct.model.js"
import UserModel from "../models/user.model.js"

export const addToCartItemController = async(req,res)=>{
    try {
        const  userId = req.userId
        const { productId } = req.body
        
        if(!productId){
            return res.status(402).json({
                message : "Provide productId",
                error : true,
                success : false
            })
        }

        const checkItemCart = await cartProductModel.findOne({
            userId : userId,
            productId : productId
        })

        if(checkItemCart){
            return res.status(400).json({
                message : "Item already in cart"
            })
        }

        const cartItem = new cartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })
        const save = await cartItem.save()

        const updateCartUser = await UserModel.updateOne({ _id : userId},{
            $push : { 
                shopping_cart : productId
            }
        })

        return res.json({
            data : save,
            message : "Item add successfully",
            error : false,
            success : true
        })

        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCartItemController = async(req,res)=>{
    try {
        const userId = req.userId

        const cartItem =  await cartProductModel.find({
            userId : userId
        }).populate('productId')

        return res.json({
            data : cartItem,
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateCartItemQtyController = async(req,res)=>{
    try {
        const userId = req.userId 
        const { _id,qty } = req.body

        if(!_id ||  !qty){
            return res.status(400).json({
                message : "provide _id, qty"
            })
        }

        const updateCartitem = await cartProductModel.updateOne({
            _id : _id,
            userId : userId
        },{
            quantity : qty
        })

        return res.json({
            message : "Update cart",
            success : true,
            error : false, 
            data : updateCartitem
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteCartItemQtyController = async(request,response)=>{
    try {
      const userId = request.userId // middleware
      const { _id } = request.body 
      
      if(!_id){
        return response.status(400).json({
            message : "Provide _id",
            error : true,
            success : false
        })
      }

      const deleteCartItem  = await cartProductModel.deleteOne({_id : _id, userId : userId })

      return response.json({
        message : "Item remove",
        error : false,
        success : true,
        data : deleteCartItem
      })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}