import './App.css'
import Home from './pages/Home'
import { Route,Router, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
function App() {

  return(
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />

        
      </Routes>
    </div>
  )
}

export default App
