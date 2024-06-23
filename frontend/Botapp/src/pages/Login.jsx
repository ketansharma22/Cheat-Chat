import React, { useState } from 'react'
import '../styling/Login.css'
import logo from '../images/logocircle.png';
import {Link} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext';


function Login() {
  const auth=useAuth()
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const [formData,setFormData]=useState({
    Email:"",
    Password:"",
  })

  

  async function handleSubmit(e){
    e.preventDefault()
     setFormData({email:email,password:password})
    console.log(formData);
    const em= formData.Email
    const pass=formData.Password
    try{
      toast.loading("Logging In",{id:"Login"})
      await auth.login(em,pass)
      toast.success("Logged In",{id:"Login"})
    }
    catch(error){
      toast.error("Login Failed",{id:"Login"})
      console.log(error);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevUser) => ({ ...prevUser, [name]: value }));
    

  };

  return (
    <div id="loginpage">
      <form id="boxlogin" onSubmit={handleSubmit}>
        <img id="logoimage" src={logo} />
        <h1>Welcome Back !!</h1>

        <div id="inputss">
          
          <label
            style={{
              fontSize: "larger",
              fontWeight: "bold",
              paddingLeft: "2px",
            }}
          >
            Email-Address
          </label>
          <input type="email" required placeholder="Email-Address*" name="Email" value={formData.Email} onChange={handleChange} />
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
          <input type="password" placeholder="Password*" value={formData.Password} name="Password" onChange={handleChange}
          required />
        </div>

        <button id="continue" type='submit'>Continue</button>
        <div id="already">
            <p>Don't have an account ? <span>
                <Link style={{textDecoration:"none",color:"rgba(38, 144, 117, 0.975)",fontWeight:"bolder"}} to='/signup'>Sign-up</Link>
            </span></p>
        </div>
      </form>
    </div>
  )
}

export default Login