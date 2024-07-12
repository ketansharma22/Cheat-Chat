import jwt from 'jsonwebtoken'

import { config } from 'dotenv'
config()
const Cokiename="authtoken"  
export const createToken= (id,email,expiresIn)=>{
    const token=jwt.sign({id:id,email:email},process.env.JWT_SECRET ,{
        expiresIn:expiresIn,
    })
    return token;
}
export const verifyToken=async(req,res,next)=>{
    const token=req.signedCookies[`${Cokiename}`]
    console.log(token);
    console.log("tokenmanager");
    if (!token || token.trim() === "") {
        console.log("eror");
        return res.status(401).json({ message: "Token Not Received",token });
        console.log("errorpakka");
      }
      console.log(token);
      return new Promise((resolve, reject) => {
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(err){
                console.log("error in tm");
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else{
                console.log("success in tm");
                resolve()
                res.locals.jwtData=success;
                return next()
            }
        })
      })

}

