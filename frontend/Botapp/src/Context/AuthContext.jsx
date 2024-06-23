import React from 'react'
import { checkAuthStatus, userLogin, userSignUp } from '../helpers/api_communicators'
import  { useContext,useState } from 'react'
import { useEffect } from 'react'
const AuthContext=React.createContext()
export function useAuth() {
  return useContext(AuthContext)
}

 export function AuthProvider({children}) {
        const[user,setUser]=useState(null)
        const[isLoggedIn,setIsLoggedIn]=useState(false)

        //if user's cookies are valid then skip login
        useEffect(()=>{
          async function checkStatus(){
            const data=await checkAuthStatus()
            if(data){
            setUser({email:data.Email,name:data.Name})
            setIsLoggedIn(true)
            }
            
          }
          checkStatus()
        },[])
        
        const login=async(email,password)=>{
          const data=await userLogin(email,password)
          if (data) {
            setUser({email:data.Email,name:data.Name})
            setIsLoggedIn(true)
          }
        }
        
        const signup=async(name,email,password)=>{
          const data=await userSignUp(name,email,password)
          if(data){
            setUser({email:data.Email,name:data.Name})
            setIsLoggedIn(true)
          }
        }

        const value={
        user,
        isLoggedIn,
        login,
        signup
      }
return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>



      }
      