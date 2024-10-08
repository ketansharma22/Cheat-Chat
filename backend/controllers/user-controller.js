import usersModel from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import nodemailer from 'nodemailer'
import { config } from "dotenv";
import {  sendEmail } from "../utils/nodemailer.js";
config();
// import {send} from "../utils/nodemailer.cjs"
// console.log(nodemailer);
const { hash, compare } = bcrypt;
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersModel.find();
    return res.json({ message: "helo", users });
  } catch (error) {
    console.log(error);
  }
};

export const userSignup = async (req, res, next) => {
  try {
    console.log("signup");
    const { name, email, password } = req.body;
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) return res.status(401).send("user already exists");
    const hashedPass = await hash(password, 10);
    const user = new usersModel({ name, email, password: hashedPass });
    await user.save();
    console.log("saved");

    try {
      const data=await sendEmail({email});
      res.status(200).send("otp sent successfullt")

    } catch (error) {
      console.log(error);
    }

    //for signup
    res.clearCookie("auth_token", {
      httpOnly: true,
      signed: true,
      secure:true,
      // domain:"cheat-chat-production.up.railway.app",
    });
    

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.status(200).cookie(COOKIE_NAME, token, {
      expires,
      httpOnly: true,
      signed: true,
      // domain:"localhost",
    });
    return res.json({ message: "user created" });
  } catch (error) {
    console.log(error);
  }
};
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });
    if (!user) {
      res.status(401).send("user not registered");
    }
    const isPassCorrect = await compare(password, user.password);

    if (!isPassCorrect) {
      return res.status(403).json("incorrect password");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      secure: true,
      // domain:"localhost",
    });

    const token = createToken(user._id.toString(), user.email, "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.status(200).cookie(COOKIE_NAME, token, {
      expires,
      httpOnly: true,
      signed: true,
      // domain:"localhost",
    });
    res.send({ message: "loginsuccess", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
  }
};
export const verifyUser = async (req, res, next) => {
  try {
    console.log("controller");
    const user = await usersModel.findById(res.locals.jwtData.id);
    if (!user) {
      console.log("err in controller");
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    console.log(user._id.toString(), res.locals.jwtData.id);
    if (user._id.toString() !== res.locals.jwtData.id) {
      console.log("not matched");
      return res.status(401).send("Permissions didn't match");
    }
    console.log("success in controller");
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (req, res, next) => {
  try {
    //user token checking
    const user = await usersModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      // domain:"cheat-chat-production.up.railway.app",
    });

    return res
      .status(200)
      .json({ message: "ok", name: user.name, email: user.email });
  } catch {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const forgotton = async (req, res, next) => {
  console.log("o");
  const { email } = req.body;
  const user = await usersModel.findOne(email)
  if (!user) {
    return res.status(401).send("User not registered OR Token malfunctioned");
  }
try{
  const result =await sendEmail(email)
  res.status(200).send("otp sent successfullt")
  
}
catch(error){
  console.log(error);
}


  console.log("Doneee");
};


export const verifyy=async(req,res,next)=>{
  const {otp,email}=req.body
  const user=await usersModel.findOne({email})
  if(!user){
    return res.status(401).send("User not registered OR Token malfunctioned");
  }
  try {
      if(otp==user.otp){
        delete user.otp
        return res.status(200).json({message:"otp verified successfully" ,success:true})
      }
      return res.status(401).json({message:"otp do not match",success:false})
  } catch (error) {
    console.log(error);
  }
}

export const resetPassword=async(req,res,next)=>{
  const { password,email } =req.body
  const user= await usersModel.findOne({email})
  console.log(user.password);
  if(!user){
    return res.status(401).send("User not registered OR Token malfunctioned");
  }
  try {
        const hashedPass = await hash(password, 10);    
        user.password=hashedPass;
        await user.save();
        console.log(user.password);
        return res.json({message:"Password Changed Successfully"})
  } catch (error) {
    return res.json({message:"Some error occured"})
  }
} 