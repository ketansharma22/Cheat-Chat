import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";



function VerifyOtp() {
const navigate=useNavigate()
  const auth=useAuth()
  const [otp,setOtp] = useState("");
  const [formData,setFormData] = useState({
    otp: "",
  });

  const handleChange = async (e) => {
  e.preventDefault();
  const { name, value } = e.target;
  setFormData((prevUser) => ({ ...prevUser, [name]: value }));
};

const location=useLocation()
const {state}=location
const handleSubmit = async(e) => {
  e.preventDefault();
  console.log(formData);

  try {

    toast.loading("Verifying",{id:"verify"})
      const res=await auth.verifyOTP(formData.otp)
      if(res.status=200){
        toast.success("Verified Successfully",{id:"verify"})
        navigate('/reset',{replace:true ,state:state })
      }
      else{
        toast.error("otp do not match",{id:"verify"})
      }
  } catch (error) {
    toast.error("an error occured",{id:"verify"})
    console.log(error.message);
  }
};
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "50px",
        fontSize: "xx-large",
      }}
    >
      <div>
        <label>Enter OTP ~</label>
        <input
          onChange={handleChange}
          name="otp"
          value={formData.otp}
          style={{ fontSize: "x-large", padding: 10 }}
          type="text"
          placeholder="Enter 6 digit OTP here"
        />
      </div>

      <button
        style={{
          background: "grey",
          fontSize: "x-large",
          width: 150,
          height: 50,
        }}
        type="submit"
      >
        Verify
      </button>
    </form>
  );
}

export default VerifyOtp;
