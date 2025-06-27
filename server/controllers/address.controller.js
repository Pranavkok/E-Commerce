import AddressModel from "../models/address.model.js"
import UserModel from "../models/user.model.js"

export const addAddressController = async(req,res)=>{
    try {
        const { address_line , city, state, pincode, country , mobile } = req.body
        const userId = req.userId

        const createAddress = new AddressModel({
            address_line,
            city,
            state,
            country,
            pincode,
            mobile,
            userId : userId 
        })
        const saveAddress = await createAddress.save()

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId,{
            $push : {
                address_details : saveAddress._id
            }
        })

        return res.json({
            message : "Address added successfully",
            error : false ,
            success : true ,
            data : saveAddress
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error ,
            error : true ,
            success : false 
        })
    }
}