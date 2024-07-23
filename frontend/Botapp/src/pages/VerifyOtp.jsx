import React, { useState } from "react";



function VerifyOtp() {
  const [otp,setOtp] = useState("");
  const [formData,setFormData] = useState({
    otp: "",
  });
  const handleChange = async (e) => {
  e.preventDefault();
  const { name, value } = e.target;
  setFormData((prevUser) => ({ ...prevUser, [name]: value }));
};
const handleSubmit = async(e) => {
  e.preventDefault();
  console.log(formData);
  try {
    
  } catch (error) {
    
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
