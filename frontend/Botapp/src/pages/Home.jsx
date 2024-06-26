import React from "react";
import "../styling/Home.css";
import { Link } from "react-router-dom";
import logo from "../images/logocirclewhite.png";
import { useAuth } from "../Context/AuthContext";
function Home() {
  const auth = useAuth();
  return (
    <div id="home" style={{ margin: "20px" }}>
      <nav id="homenav">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <div id="navleft">
            <img id="logoimage" src={logo} />
            <h1 style={{ fontFamily: "cursive" }}>Cheat-Chat</h1>
          </div>
        </Link>
        {auth.isLoggedIn ? (
          
          <div id="navright">
            <Link to="/chat">
              <button style={{ color: "white" }}>Go to Chat </button>
            </Link>
            <Link to="/" onClick={auth.logout}>
              <button style={{ background: "grey", border: "none" }}>
                Logout
              </button>
            </Link>
          </div>
        ) : (
          
          <div id="navright">
            <Link to="/login">
              <button style={{ color: "white" }}>Login</button>
            </Link>
            <Link to="/signup">
              <button style={{ background: "grey", border: "none" }}>
                Sign-Up
              </button>
            </Link>
          </div>
        )}
      </nav>
      <section id="mainhome">
        <img src={logo} />
        {auth.isLoggedIn ? (
          <>
          <h1>Welcome Back <span>{auth.user.name}</span> Good to see u</h1>
            <div id="buttonss">
            <Link to="/chat">
              <button style={{ color: "white" }}>Go to Chat </button>
            </Link>
            <Link to="/" onClick={auth.logout}>
              <button style={{ background: "grey", border: "none" }}>
                Logout
              </button>
            </Link>
            </div>
          </>
        ) : (
          <>
            
            <h1>Authentication Required</h1>
            <h2>Please Log-in To access this page</h2>
            <div id="buttonss">
              <Link to="/login">
                <button style={{ color: "white" }}>Login</button>
              </Link>
              <Link to="/signup">
                <button style={{ background: "grey", border: "none" }}>
                  Sign-Up
                </button>
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;
