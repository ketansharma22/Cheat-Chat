import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
export const createToken= (id,email,expiresIn)=>{
    const token=jwt.sign({id:id,email:email},process.env.JWT_SECRET ,{
        expiresIn:expiresIn,
    })
    return token;
}

