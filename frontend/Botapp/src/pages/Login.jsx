import React from 'react'
import '../styling/Login.css'
import logo from '../images/logocircle.png';
import {Link} from 'react-router-dom'
function Login() {
  return (
    <div id="loginpage">
      <div id="boxlogin">
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
          <input type="email" required placeholder="Email-Address*" />
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
          <input type="password" placeholder="Password*"
          required />
        </div>

        <button id="continue">Continue</button>
        <div id="already">
            <p>Don't have an account ? <span>
                <Link style={{textDecoration:"none",color:"rgba(38, 144, 117, 0.975)",fontWeight:"bolder"}} to='/signup'>Sign-up</Link>
            </span></p>
        </div>
      </div>
    </div>
  )
}

export default Login