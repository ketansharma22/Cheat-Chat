import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { COOKIE_NAME } from './constants'
config()
export const createToken= (id,email,expiresIn)=>{
    const token=jwt.sign({id:id,email:email},process.env.JWT_SECRET ,{
        expiresIn:expiresIn,
    })
    return token;
}

export const verifyToken=async(req,res,next)=>{
    const token=req.signedCookies[`${COOKIE_NAME}`]
    console.log(token);
}