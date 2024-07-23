import React, { useState } from "react";
import "../styling/Forgot.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
const Forgot = () => {
    const auth=useAuth()
    const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const[formData,setFormData]=useState({
    email:"",
  })


  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(formData);
    try {
        await auth.forgot(formData)
        
    } catch (error) {
     console.log(error);   
    }
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
