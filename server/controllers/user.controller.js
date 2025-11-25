import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generatedAccessToken from '../utils/generatedAccessToken.js'
import generatedRefreshToken from '../utils/generatedRefreshToken.js'
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js'
import generatedOtp from '../utils/generatedOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'
import jwt from 'jsonwebtoken'

export async function registerUserController(req,res){
    try {
        const {name , email , password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({
                message : "provide name email and password ",
                error : true ,
                success : false 
            })
        }

        const user = await UserModel.findOne({email})

        if(user){
            return res.json({
                message : "Email already exist",
                error : true ,
                success : false 
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)
        const payload = {
            name ,
            email ,
            password : hashpassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email ,
            subject : "Verification email from BlinkeyIt",
            html : verifyEmailTemplate({
                name : name,
                url : verifyEmailUrl
            })
        })

        return res.json({
            message : "User Register Successfully ",
            error : false ,
            success : true ,
            data : save
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error ,
            error : true ,
            success : false 
        })
    }
}

export async function verifyEmailController(req,res){
    try {
        const { code } = req.body
        const user = await UserModel.findOne({ _id : code })

        if(!user){
            return res.status(400).json({
                message : "Invalid code",
                error : true ,
                succes : false
            })
        }

        const updateUser = await UserModel.updateOne({ _id : code},{
            verify_email : true 
        })

        return res.json({
            message : "Verified the user",
            error : false ,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error ,
            error : true ,
            success : false 
        })
    }
}

//  Login Controller
export async function loginController(req,res){
    try {

        const { email , password } = req.body ;

        if(!email || !password){
            return res.status(400).json({
                message : "Provide email and password",
                error : true ,
                success : false
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "User Not Found",
                error : true ,
                success : false
            })
        }

        if(user.status !== "Active"){
            return res.status(400).json({
                message : "Contact to admin",
                error : true ,
                success : false 
            })
        }

        const checkPassword = await bcryptjs.compare(password,user.password)

        if(!checkPassword){
            return res.status(400).json({
                message : "Check Your Password",
                error : true ,
                success : false 
            })
        }
        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const cookiesOption = {
            httpOnly : true ,
            secure : process.env.NODE_ENV === "production" ? true : false,
            samesite : "None"
        }

        res.cookie('accessToken',accessToken,cookiesOption)
        res.cookie('refreshToken',refreshToken,cookiesOption)

        return res.json({
            message : "Login Successfully",
            error : false ,
            success : true ,
            data : {
                accessToken,
                refreshToken
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Logout Controller
export async function logoutController(req,res){
    try {
        const userid = req.userId
        const cookiesOption = {
            httpOnly : true ,
            secure : process.env.NODE_ENV === "production" ? true : false,
            samesite : "None"
        }
        res.clearCookie("accessToken",cookiesOption);
        res.clearCookie("refreshToken",cookiesOption);
        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })

        res.json({
            message : "Successfully Loggedout",
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

// upload user avatar
export async function uploadAvatar(req,res){
    try {
        const userId = req.userId //auth middleware 
        const image = req.file  // multer middleware 

        const upload = await uploadImageCloudinary(image)
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return res.json({
            message : "Upload Profile ",
            success : true ,
            error : false ,
            data : {
                avatar : upload.url
            }
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true ,
            success : false 
        })
    }
}

// upadte user details 
export async function updateUserDetails(req,res){
    try {
        const userId = req.userId // from the auth middleware 
        const {name , email , mobile , password} = req.body

        let hashpassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashpassword = await bcryptjs.hash(password,salt)
        }

        const updateUser = await UserModel.updateOne({_id : userId},{
            ...(name && {name : name}),
            ...(email && {email : email}),
            ...(mobile && {mobile : mobile}),
            ...(password && {password : hashpassword})
        })

        return res.json({
            message : "Updated Succesfully",
            error : false ,
            success : true ,
            data : updateUser
        })
    } catch (error) {
       return res.status(500).json({
        message : error.message || error ,
        error : true ,
        success : false 
       }) 
    }
}

// forgot password 
export async function forgotPasswordController(req,res){
    try {
        const {email} = req.body 

        const user = await UserModel.findOne({ email })

        if(!user){
            res.status(400).json({
                message : "User not Available" ,
                error : true ,
                success : false 
               }) 
        }

        const otp = generatedOtp()
        const expireTime = new Date() + 60 * 60 * 1000

        const update = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo : email ,
            subject : "Forgot Your Password of BlinkeyIt",
            html : forgotPasswordTemplate({
                name : user.name,
                otp : otp
            })
        })

        return res.json({
            message : "Forget  you Password ? Check your email",
            data : otp,
            success : true ,
            error : false 
        })

    } catch (error) {
       return res.status(500).json({
        message : error.message || error ,
        error : true ,
        success : false 
       }) 
    }
}

export async function verifyForgotPasswordOtp(req,res){
    try {
        const {email,otp} = req.body 

        if(!email || !otp){
            return res.status(500).json({
                message : "Please provide a required fields otp and email",
                success : false ,
                error : true 
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            res.status(400).json({
                message : "User not Available" ,
                error : true ,
                success : false 
               }) 
        }

        const currentTime = new Date().toISOString();

        if(user.forgot_password_expiry < currentTime){
            return res.json({
                message : "Otp expired",
                success : false,
                error : true
            })
        }

        if(otp !== user.forgot_password_otp){
            return res.status(400).json({
                message : "Invalid OTP",
                error : true ,
                success : false
            })
        }

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : "",
            forgot_password_expiry : ""
        })

        return res.json({
            message : "Verified SuccessFully",
            error : false ,
            success : true 
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ,
            error : true ,
            success : false 
        })
    }
}

export async function resetpassword(req,res){
    try {
        const {email,newpassword,confirmpassword} = req.body ;

        if(!email || !newpassword || !confirmpassword){
            return res.status(400).json({
                message : "Please Provide all fields",
                error : true ,
                success : false 
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "Email is not available ",
                error : true ,
                success : false 
            })
        }

        if(newpassword !== confirmpassword){
            return res.status(400).json({
                message : "newpassword and confirmpassword must be same ",
                error : false,
                success :true 
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newpassword,salt)

        const update = await UserModel.findOneAndUpdate(user._id,{
            password : hashPassword
        })

        return res.status(200).json({
            message : "Password Reset Successfully",
            error : false ,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ,
            error : true ,
            success : false 
        }) 
    }
}

export async function refreshToken(req,res){
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

        if(!refreshToken){
            return res.status(401).json({
                message : "Invalid token",
                error : true ,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return res.status(401).json({
                message : "Token is expired ",
                error : true ,
                success : false 
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken()

        const cookiesOption = {
            httpOnly : true ,
            secure :true,
            samesite : "None"
        }

        res.cookie('accessToken',newAccessToken,cookiesOption)

        return res.json({
            message : "New Access Token is generated ",
            error : false ,
            success : true ,
            data : {
                accessToken : newAccessToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message ,
            error : true ,
            success : false 
        })
    }
}

// get login user details 
export async function userDetails(req,res){
    try {
        const userId = req.userId ;
        const user = await UserModel.findById(userId).select('-password -refresh_token')
        return res.json({
            message : "User Details fetched succesfully",
            data : user,
            error : false ,
            success : true 
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message,
            error : true ,
            success : false 
        })
    }
}