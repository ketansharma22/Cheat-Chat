import { Router } from "express";
import { getAllUsers, userSignup ,userLogin} from "../controllers/user-controller.js";
import {validate,signupValidator} from '../utils/validators.js'
import { verifyToken } from "../utils/token-manager.js";
const userRoutes=Router()
userRoutes.get('/',getAllUsers)
userRoutes.post('/signup',validate(signupValidator),userSignup)
userRoutes.post('/login',userLogin)
userRoutes.get('/auth-status',verifyToken,userLogin)
export default userRoutes   