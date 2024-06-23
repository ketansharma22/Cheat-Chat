import React from 'react'
import axios from 'axios'
export const userLogin=async(email,password)=>{
    const res=await axios.post("/users/login",{email,password})
    if(res.status==401 && res.status==403){
        throw new Error("Unable To Login")
    }
    const data=await res.data
    return data
}
export const userSignUp=async(name,email,password)=>{
    const res=await axios.post("users/signup",{name,email,password})
    const data=await res.data
    return data
    
}
export const checkAuthStatus=async()=>{
    const res=axios.get('/users/auth-status')
    if(res.status!==200){
        throw new Error("Unable to Authenticate")
    }
    const data=res.data
    return data
}

