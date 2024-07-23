import nodemailer from 'nodemailer'
import { config } from "dotenv";
config();
import otpGenerator from 'otp-generator'

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
      text:`DO NOT SHARE WITH ANYONE 
      your 6 otp is : ${otp}`,
    })
} catch (error) {
  console.log(error);
}
}
