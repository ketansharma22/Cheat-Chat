import React, { useState } from "react";
import "../styling/Signup.css";
import logo from "../images/logocircle.png";
import {Link} from 'react-router-dom'



function Signup() {
 
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
    setFormData({email,password,name})
    console.log(formData);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevUser) => ({ ...prevUser, [name]: value }));
  };


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
