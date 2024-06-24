import './App.css'
import Home from './pages/Home'
import { Route,Router, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useAuth } from './Context/AuthContext'
import Chat from './pages/Chat'
function App() {
const auth=useAuth()
  return(
    <div>
      <Routes>
        
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        {
          auth.isLoggedIn && auth.user && (
            <Route path='/chat' element={<Chat/>} />
          )
        }
        
      </Routes>
    </div>
  )
}

export default App
