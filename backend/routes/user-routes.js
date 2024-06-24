import { Router } from "express";
import { getAllUsers, userSignup ,userLogin, verifyUser} from "../controllers/user-controller.js";
import {validate,signupValidator} from '../utils/validators.js'
import { verifyToken } from "../utils/token-manager.js";
const userRoutes=Router()
userRoutes.get('/',getAllUsers)
userRoutes.post('/signup',validate(signupValidator),userSignup)
userRoutes.post('/login',userLogin)
userRoutes.get('/auth-status',verifyToken,verifyUser)
export default userRoutes   