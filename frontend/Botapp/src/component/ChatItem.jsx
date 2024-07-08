import React from "react";
import "../styling/ChatItem.css";
import ailogo from "../images/logocirclewhite.png";
import { useAuth } from "../Context/AuthContext";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { coldarkCold, coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
function extractCode(message){
  if(message.includes("```")){
    const blocks=message.split("```")
    return blocks
  }
}

function isCodeBlock(str){
  if(str.includes("=") || str.includes(";") || str.includes("[") || str.includes("]") || str.includes("{") || str.includes("}") || str.includes("#") || str.includes("//")){
    return true;
  }
  return false
}
export const ChatItem = ({content, role}) => {
  const messageBlock=extractCode(content)
  const auth = useAuth();
  return role == "asistant" ? (
    <div id="asistantdiv">
      <img id="logosame" src={ailogo} />
      <div>{
          !messageBlock && (<h3 style={{display:"flex",flexDirection:"column",alignItems:"start",justifyContent:"baseline"}}>{content}</h3>)
      }
      {
        messageBlock && messageBlock.length && messageBlock.map((block) => (isCodeBlock(block) 
        ? (<SyntaxHighlighter style={coldarkDark} language="javascript">{block}</SyntaxHighlighter>)
        :
        (<div style={{display:"flex",flexDirection:"column",color:"white",fontSize:"large",fontWeight:"bolder"}}>{block}</div>)))
      }</div>
      
      
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
