import { otpGenerator } from 'otp-generator';
export const GenerateOTP=()=>{
    const otp=otpGenerator.generate(4,{upperCaseAlphabets:false,specialChars:false})
    return otp
}
