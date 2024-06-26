import React from "react";
import "../styling/ChatItem.css";
import ailogo from "../images/logocirclewhite.png";
import { useAuth } from "../Context/AuthContext";
export const ChatItem = ({content, role}) => {
  const auth = useAuth();
  return role == "asistant" ? (
    <div id="asistantdiv">
      <img id="logosame" src={ailogo} />
      <h3>{content}</h3>
    </div>
  ) : (
    <div id="userdiv">
      <div id="logosame" style={{background:"black", color:"white", borderRadius:20, display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bolder"}}>
        {auth.user.name[0]}{auth.user.name[2]}
      </div>
      <h3>{content}</h3>
    </div>
  );
};
