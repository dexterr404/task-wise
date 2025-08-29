import { useState } from 'react'
import { Routes,Route,useLocation } from 'react-router-dom'
import SideBar from './components/SideBar'
import Task from './pages/Task'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {
  const location = useLocation();

  const hideSidebar = location.pathname === "/login" || location.pathname === "/register";
  return (
    <main className='relative'>
    {!hideSidebar && <SideBar />}
    <Routes>
      <Route path='/register' element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path='/Dashboard' element={<Dashboard />}/>
      <Route path='/Task' element={<Task />}>
      </Route>
    </Routes>
    </main>
  )
}

export default App
