import usersModel from "../models/usersModel.js"
import bcrypt from 'bcryptjs'
import { createToken } from "../utils/token-manager.js"
import { COOKIE_NAME } from "../utils/constants.js"
// import { createTransport } from "nodemailer"
const {hash,compare}=bcrypt
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
        console.log("signup");
        const {name,email,password}= req.body;
        const existingUser=await usersModel.findOne({email})
        if(existingUser) return res.status(401).send("user already exists")
        const hashedPass= await hash(password,10)
        const user=new usersModel({name,email,password:hashedPass})
        await user.save()
        console.log("saved");

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
        res.status(200).cookie(COOKIE_NAME,token,
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
            
        if(!isPassCorrect){
            return res.status(403).json("incorrect password")
        }
        console.log("login");
        

        res.clearCookie(COOKIE_NAME,{
            domain:"localhost",
            httpOnly:true,
            signed:true,
            path:'/',
        })  

        const token=createToken(user._id.toString(),user.email,"7d")
        console.log(token);

        const expires=new Date()
        expires.setDate(expires.getDate()+7)

        res.status(200).cookie(COOKIE_NAME,token,
        {
            path:'/',
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true,
            secure:false,
        })
        res.send({message:"loginsuccess" ,name:user.name ,email:user.email })

    }   
    
    catch(error){
        console.log(error);
    } 
}
export const verifyUser=async(req,res,next)=>{
    try{
        console.log("controller");
        const user=await usersModel.findById(res.locals.jwtData.id)
        if(!user){
            console.log("err in controller");
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            console.log("not matched");
            return res.status(401).send("Permissions didn't match");
          }
          console.log("success in controller");
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
        }
       catch(error){
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
        } 
    

    
}

export const userLogout=async(req,res,next)=>{
    try{
            //user token checking
        const user=await usersModel.findById(res.locals.jwtData.id)
        if(!user){
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
          }
          res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
          })

          return res.status(200).json({message:"ok",name:user.name,email:user.email})
    }
    catch{
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}

export const forgotton=async(req,res,next)=>{
    const {email}=req.body
    const user=await usersModel.findById(res.locals.jwt.id)
    if(!user){
        return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }

      const transporter=nodemailer.createTransport(transport[defaults])
}