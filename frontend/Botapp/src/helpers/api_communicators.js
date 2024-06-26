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
    const res=await axios.post("/users/signup",{name,email,password})
    const data=await res.data
    return data
    
}
export const checkAuthStatus=async()=>{
    const res=await axios.get("/users/auth-status")
    if(res.status!=200){
        throw new Error("Unable to Authenticate")
    }
    const data=res.data
    console.log("comm");
    return data
}


export const logoutUser=async()=>{
    const res=await axios.get("/users/logout")
    if(res.status !== 200){
        throw new Error("Unable to logout")
    }
    const data=await res.data
    return data
}

export const sendChatRequest=async(message)=>{
    console.log(message);
    const res= await axios.post("/chats/new",{message})
    if (res.status !== 200) {
        throw new Error("Unable to send chat");
      }
      console.log("noerrin api comm");
      const data = await res.data;
      return data;
}
