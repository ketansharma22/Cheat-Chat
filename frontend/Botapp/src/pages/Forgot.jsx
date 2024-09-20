import React, { useState } from "react";
import "../styling/Forgot.css";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
const Forgot = () => {
  const[loading,setLoading]=useState(false)
    const auth=useAuth()
    const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const[formData,setFormData]=useState({
    email:"",
  })


  const handleSubmit=async(e)=>{
    setLoading(true)
    e.preventDefault()
    console.log(formData);
    try {
        toast.loading("Processing",{id:"forgot"})
        const res=await auth.forgot(formData)
        toast.success(`OTp sent to ${formData.email}`,{id:"forgot"})
        localStorage.setItem('email',formData.email)
        navigate('/verifyotp',{state:formData.email,replace:true} )
    } catch (error) {
        console.log(error);
    }
    setLoading(false)
  }


  const handleChange = async (e) => {
    e.preventDefault();
    const{name,value}=e.target
    setFormData((prevUser) => ({ ...prevUser, [name]: value }));
  };
  return (
    <div id="forgot">
      <form onSubmit={handleSubmit} id="forgotform">
      <label style={{fontWeight:600}}>Enter your Email-Address</label>
        <input
        disabled={loading}
        
        style={{padding:5,fontSize:"larger"}}
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
        <button disabled={loading} style={{color:"white",background:"black"}} type="submit">
            Continue
        </button>
      </form>
    </div>
  );
};
export default Forgot;
