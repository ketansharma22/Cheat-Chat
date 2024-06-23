import jwt from 'jsonwebtoken'
import { COOKIE_NAME } from './constants'
import { config } from 'dotenv'
config()

export const createToken= (id,email,expiresIn)=>{
    const token=jwt.sign({id:id,email:email},process.env.JWT_SECRET ,{
        expiresIn:expiresIn,
    })
    return token;
}
export const verifyToken=async(req,res,next)=>{
    const token=req.signedCookies[`${COOKIE_NAME}`]
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received" });
      }
      console.log(token);
}

