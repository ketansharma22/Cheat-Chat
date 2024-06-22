import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
export const createToken= (id,email,expiresIn)=>{
    const payload={id:id,email:email};
    const token=jwt.sign(payload,process.env.JWT_SECRET ,{
        expiresIn:expiresIn,
    })
    return token;
}
