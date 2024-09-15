import React, { useState,useEffect } from "react";
import "../styling/Signup.css";
import logo from "../images/logocircle.png";
import {Link} from 'react-router-dom'
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";


function Signup() {
  const navigate =useNavigate()
 const auth=useAuth()
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const [formData,setFormData]=useState({
    Name:"",
    Email:"",
    Password:"",
  })
   async function handlesubmit(e){
    e.preventDefault()
    setFormData({Name:name,Email:email,Password:password})
    console.log(formData);
    try{
      toast.loading("Signing in",{id:"signup toast"})

      const datas=await auth.forgot(formData.Email)  //basically send the otp


      // await auth.signup(formData.Name,formData.Email,formData.Password)
      localStorage.setItem('email',formData.Email)
      navigate("/verifySignup",{replace:true,state:{name:formData.Name,email:formData.Email,password:formData.Password}})
      toast.success("Otp sent",{id:"signup toast"})
    }
    catch(error){
      toast.error("signup Failed",{id:"signup toast"})
      console.log(error);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevUser) => ({ ...prevUser, [name]: value }));
  };
  // useEffect(()=>{
  //   if(auth.user){
  //     return navigate("/verifyotp")
  //   }
  // },[auth])


  return (
    <div id="signuppage">
      <form id="boxsignup" onSubmit={handlesubmit}>
        <img id="logoimage" src={logo} />
        <h1>Create an Account</h1>

        <div id="inputss">
          <label
            style={{
              fontSize: "larger",
              fontWeight: "bold",
              paddingLeft: "2px",
            }}
          >
            Name
          </label>
          <input type="name" required placeholder="Name*" value={formData.Name} name="Name" onChange={handleChange}  />
          <br />
          <label
            style={{
              fontSize: "larger",
              fontWeight: "bold",
              paddingLeft: "2px",
            }}
          >
            Email-Address
          </label>
          <input required type="email" placeholder="Email-Address*" name="Email" value={formData.Email} onChange={handleChange}/>
          <br />
          <label
            style={{
              fontSize: "larger",
              fontWeight: "bold",
              paddingLeft: "2px",
            }}
          >
            Password
          </label>
          <input required type="password" value={formData.Password} name="Password" placeholder="Password*" onChange={handleChange}/>
        </div>

        <button id="continue" type="submit" >Continue</button>
        <div id="already">
            <p>Already have an account ? <span>
                <Link style={{textDecoration:"none",color:"rgba(38, 144, 117, 0.975)",fontWeight:"bolder"}} to='/login'>Login</Link>
            </span></p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
