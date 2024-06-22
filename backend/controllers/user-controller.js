import usersModel from "../models/usersModel.js"
import {hash,compare} from 'bcrypt'
import { createToken } from "../utils/token-manager.js"
import { COOKIE_NAME } from "../utils/constants.js"
export const getAllUsers=async(req,res,next)=>{
    try{    
        const users = await usersModel.find()
        return res.json({message:"helo",users})
    }   
    
    catch(error){
        console.log(error);
    } 
}

export const userSignup=async(req,res,next)=>{
    try{    
        const {name,email,password}= req.body;
        const existingUser=await usersModel.findOne({email})
        if(existingUser) return res.status(401).send("user already exists")
        const hashedPass= await hash(password,10)
        const user=new usersModel({name,email,password:hashedPass})
        await user.save()

        //for signup 
        res.clearCookie("auth_token",{
            domain:"localhost",
            httpOnly:true,
            signed:true,
            path:'/',
        })

        const token=createToken(user._id.toString(),user.email,"7d")
        const expires=new Date()
        expires.setDate(expires.getDate()+7)
        res.cookie("auth_token",token,
        {
            path:'/',
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true,
        })
        return res.json({message:"user created"})
    }   
    
    catch(error){
        console.log(error);
    } 
}
export const userLogin=async(req,res,next)=>{
    try{    
        const {email,password}= req.body;

        const user= await usersModel.findOne({email})
        if(!user){

            res.status(401).send("user not registered")
        }
        const isPassCorrect=await compare(password,user.password)
            
        if(!isPassCorrect){x`   `
            res.status(403).send("incorrect password")
        }
        console.log("login");
        

        // res.clearCookie(COOKIE_NAME,{
        //     domain:"localhost",
        //     httpOnly:true,
        //     signed:true,
        //     path:'/',
        // })  

        const token=createToken(user._id.toString(),user.email,"7d")
        console.log(token);

        const expires=new Date()
        expires.setDate(expires.getDate()+7)

        res.cookie(COOKIE_NAME,token,
        {
            path:'/',
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true,
            secure:false,
        })

    }   
    
    catch(error){
        console.log(error);
    } 
}