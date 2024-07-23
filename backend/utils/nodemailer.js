import nodemailer from 'nodemailer'
import { config } from "dotenv";
config();
import otpGenerator from 'otp-generator'
import usersModel from '../models/usersModel';

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: false, // or 'STARTTLS'
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});
const otp=otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false})

export const sendEmail=async(email)=>{
try {
     await transporter.sendMail({
      from:"process.env.USER",
      to: email.email,
      subject:"Cheat-Chat otp verification ",
      text:`your 6 otp is : ${otp}`,
    })

    //saving otp in database
    const user=await usersModel.findOne({email})
    if (!user) {
      res.status(401).send("user not registered");
    }
    user.otp={otp}
    await user.save()
    
} catch (error) {
  console.log(error);
}
}
