import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
function Chat() {
  const auth=useAuth
  return (
    <div>
    <p>chats</p>
    <Link to="/" onClick={auth.logout}>
    <button style={{ background: "grey", border: "none" }}>
      Logout
    </button>
  </Link></div>
  )
}

export default Chat