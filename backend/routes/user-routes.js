import { Router } from "express";
import { getAllUsers, userSignup ,userLogin} from "../controllers/user-controller.js";
import {validate,signupValidator} from '../utils/validators.js'
const userRoutes=Router()
userRoutes.get('/',getAllUsers)
userRoutes.post('/signup',validate(signupValidator),userSignup)
userRoutes.post('/login',userLogin)
export default userRoutes   