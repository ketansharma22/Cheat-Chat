import React from 'react'
import { checkAuthStatus, forgotPass, logoutUser, userLogin, userSignUp } from '../helpers/api_communicators'
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
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true)
            
            }
            
          }
          checkStatus()
        },[])
        
        const login=async(email,password)=>{
          const data=await userLogin(email,password)
          console.log(data);
          if (data) {
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true)
          }
        }
        
        const signup=async(name,email,password)=>{
          const data=await userSignUp(name,email,password)
          if(data){
            setUser({email:data.Email,name:data.Name})
            console.log(user);
            setIsLoggedIn(true)
          }
        }
        const forgot=async(email)=>{
          const data =await forgotPass(email)
          if(data){
            console.log(data);
          }
        }
        const logout=async()=>{
          await logoutUser()
          setIsLoggedIn(false)
          console.log(isLoggedIn);
          setUser(null)
          window.location.reload()
        }

        const value={
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        forgot,
      }
return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>



      }
      