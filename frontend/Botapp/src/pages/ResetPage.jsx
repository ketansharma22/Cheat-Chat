import React, { useState } from "react";
import "../styling/ResetPage.css";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const resetPage = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const {state}=location
    const auth=useAuth()
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmpass: "",
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmpass){
        toast.error("passwords donot match",{id:"reset"})
        return;
    }
    try{
        toast.loading("Loading",{id:"reset"})
        const data=await auth.reset(formData.password,state)
        navigate("/login")
        toast.success(`${data.message}`,{id:"reset"})

    }
    catch(error){
        console.log(error);
        toast.error(`${data.message}`,{id:"reset"})
    }

  };

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlechange = (e) => {
    e.preventDefault();
    setClicked(!clicked);
  };
  return (
    <div id="resetmain">
      <form onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label>Password</label>
          <input
            name="password"
            value={formData.password}
            type={clicked ? "text" : "password"}
            minLength={6}
            placeholder="password"
            onChange={handleChange}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label>Confirm Password</label>
          <input
            name="confirmpass"
            required
            onChange={handleChange}
            value={formData.confirmpass}
            type={clicked ? "text" : "password"}
            minLength={6}
            placeholder="confirm password"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
          }}
        >
          <button type="submit" id="change">Change Password</button>
          <button onClick={handlechange} id="change2">
            {clicked ? " Hide Password" : "Show Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default resetPage;
