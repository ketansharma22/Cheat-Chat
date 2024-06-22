import React from 'react'
import { userLogin, userSignUp } from '../helpers/api_communicators'
import React, { useContext,useState } from 'react'
const AuthContext=React.createContext()
export function useAuth() {
  return useContext(AuthContext)
}

 export function AuthProvider({children}) {
        const[user,setUser]=useState(null)
        const[isLoggedIn,setIsLoggedIn]=useState(false)
        
        const login=async(email,password)=>{
          const data=await userLogin(email,password)
          if (data) {
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true)
          }
        }
        
        const signup=async(name,email,password)=>{
          const data=await userSignUp(name,email,password)
          if(data){
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true)
          }
        }

        const logout=async()=>{

        }

}
