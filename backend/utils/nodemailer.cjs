const nodemailer= require('nodemailer');
import { config } from 'dotenv';
config()
const send=()=>{
  
    const otp = 5145
    console.log(otp);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.HOST,
      port: process.env.PORT,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      }
    })
    (async function main(){
      const info=await transporter.sendMail({
          from:process.env.USER,
          to:email,
          subject:"Cheat-Chat otp Verification",
          text:`your otp is : ${otp}`,

      })
      console.log("otp sent");
    
    })()
  } 

module.exports= {
  send
}