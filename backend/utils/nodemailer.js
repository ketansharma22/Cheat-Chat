import nodemailer from 'nodemailer'
import { config } from "dotenv";
config();
import otpGenerator from 'otp-generator'
import usersModel from '../models/usersModel.js';

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: false, // or 'STARTTLS'
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

export const sendEmail=async(email)=>{
try {
  let emaill=email.email
    const otp=otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false})
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    const user=await usersModel.findOne(email)
    console.log(user);
    if (!user) {
      throw new Error(`User with email ${emaill} not found`);
    }
    console.log("helo");
    user.otp=otp
    user.otpexpiry=otpExpiry
    await user.save()

    await transporter.sendMail({
      from:"process.env.USER",
      to: email.email,
      subject:"Cheat-Chat otp verification ",
      text:`your 6 otp is : ${otp}`,
    })

    
    
} catch (error) {
  console.log(error);
}
}
