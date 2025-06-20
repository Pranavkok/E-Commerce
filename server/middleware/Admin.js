import UserModel from "../models/user.model.js";

export const admin = async(req,res,next)=>{
    try {
        const userId = req.userId

        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }
        if(user.role !== 'ADMIN'){
            return res.status(403).json({
                message: "Permission Denied",
                success: false,
                error: true
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Permission Denied",
            error: error.message,
            success: false,
            error: true
        });
    }
}