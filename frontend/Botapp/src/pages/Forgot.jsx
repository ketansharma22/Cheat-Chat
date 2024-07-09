import React, { useState } from "react";
import "../styling/Forgot.css";
import { useNavigate } from "react-router-dom";
const Forgot = () => {
    const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const[formData,setFormData]=useState({
    email:"",
    password:"",
  })


  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    
  }


  const handleChange = async (e) => {
    e.preventDefault();
    const{name,value}=e.target
    setFormData((prevUser) => ({ ...prevUser, [name]: value }));
  };
  return (
    <div id="forgot">
      <form onSubmit={handleSubmit} id="forgotform">
        <input
        style={{padding:5,fontSize:"larger"}}
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
        <button type="submit">
            Continue
        </button>
      </form>
    </div>
  );
};
export default Forgot;
