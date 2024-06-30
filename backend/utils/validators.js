import {body, validationResult,check} from 'express-validator'

export const validate=validations=>{
    return async(req,res,next)=>{
        console.log("validator");
        for(let validation of validations){
            if(typeof validation.run ==='function'){
            const result= await validation.run(req)
            if(!result.isEmpty()){
                break;
            }}
        
        }   
        const errors=validationResult(req)
        if(errors.isEmpty()){
            return next()
        }
        return res.status(422).json({errors:errors.array()})
    }
}

export const signupValidator=[
    
    body("name").notEmpty().withMessage("name is required"),
    body("email").trim().isEmail().withMessage("invalid email address"),
    body("password").isLength({min:6}).withMessage("password must be 6 characters"),
]
export const chatCompletionValidator=[
    body("message").notEmpty().withMessage("message is required"),
   
]