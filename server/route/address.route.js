import { Router } from "express";
import { addAddressController, getAddressController } from "../controllers/address.controller.js";
import auth from '../middleware/auth.js';

const addressRouter = Router()

addressRouter.post('/create-address', auth, addAddressController)
addressRouter.get('/get-address',auth,getAddressController)

export default addressRouter