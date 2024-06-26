import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import logo from "../images/logocirclewhite.png";
import "../styling/Chat.css";
import { ChatItem } from "../component/ChatItem";
import send from '../images/send.png'
import { sendChatRequest } from "../helpers/api_communicators";


function Chat() {
  const[chatMessages,setChatMessages]=useState([])
  const inputref=useRef(null)
  const handlesubmit=async(e)=>{
    e.preventDefault()
    const content=inputref.current.value
    if(inputref && inputref.current){
      inputref.current.value=""
    }
    const newMessage={role:"user",content:content}
    setChatMessages((prev)=>[...prev , newMessage])
    const chatData=await sendChatRequest(content)
    setChatMessages(...chatData.chats)
    console.log(content);
  }

  const auth = useAuth();
  return (
    <div id="chatss">
      <nav id="chatnav">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <div id="navleft">
            <img id="logoimage" src={logo} />
            <h1 style={{ fontFamily: "cursive" }}>Cheat-Chat</h1>
          </div>
        </Link>
        <div id="rightnav">
          <Link to="/" onClick={auth.logout}>
            <button style={{ background: "grey", border: "none" }}>
              Logout
            </button>
          </Link>
          <Link to="/">
            <button
              style={{
                background: "grey",
                border: "none",
                width: 140,
                textWrap: "nowrap",
              }}
            >
              Go to Home
            </button>
          </Link>
        </div>
      </nav>

      <section id="chatmain">
        <section id="leftchatmain">
          <div id="logoperson">
            {auth.user.name[0]}
            {auth.user.name[2]}
          </div>
          <h3>
            You are talking to a ChatBot made By Ketan Sharma with Love and
            While eating Pizzaaa..
          </h3>
          <h2>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </h2>
          <button style={{ width: 200, background: "white" }}>
            Clear Conversation{" "}
          </button>
        </section>

        <section id="rightchatmain">
          <h1>HAHA GPT-3.5 NITRO</h1>
          <section id="chatsection">
            {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </section>
          <div id="inputsubmit">
            <input ref={inputref} type="text" style={{width:"90%",marginRight:40,background:"rgb(35, 35, 35)",border:"2px solid rgb(121, 117, 117)",color:"whitesmoke",fontWeight:"bolder",paddingLeft:20,borderRadius:15,fontSize:"large"}} />
            
            <img  type="submit" onClick={handlesubmit} style={{width:25,marginRight:20}} src={send} />
          </div>
        </section>
      </section>
    </div>
  );
}

export default Chat;
