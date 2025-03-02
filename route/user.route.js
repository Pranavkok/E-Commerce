import {Router} from 'express' ;
import {loginController,refreshToken,resetpassword,verifyForgotPasswordOtp,forgotPasswordController, logoutController,updateUserDetails, registerUserController, uploadAvatar, verifyEmailController } from '../controllers/user.controller.js'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js';

const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.get('/logout',auth,logoutController)
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
userRouter.put('/update-user',auth,updateUserDetails)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOtp)
userRouter.put('/reset-password',resetpassword)
userRouter.post('/refresh-token',refreshToken)

export default userRouter