import './App.css'
import Home from './pages/Home'
import { Route,Router, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useAuth } from './Context/AuthContext'
import Chat from './pages/Chat'
import Forgot from './pages/Forgot'
import VerifyOtp from './pages/VerifyOtp'
import ResetPage from './pages/ResetPage'
import VerifySignup from './pages/VerifySignup'
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
        <Route path='/forgotpass' element={<Forgot/>}/>
        
        <Route path='/verifyotp' element={<VerifyOtp/>}/>
        <Route path='/reset' element={<ResetPage/>} />

        <Route path='/verifySignup' element={<VerifySignup/>}/>
        
        
      </Routes>
    </div>
  )
}

export default App
