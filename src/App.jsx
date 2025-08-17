import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import SideBar from './components/SideBar'
import Task from './pages/Task'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <main className='relative'>
    <SideBar></SideBar>
    <Routes>
      <Route path='/Dashboard' element={<Dashboard />}/>
      <Route path='/Task' element={<Task />}/>
    </Routes>
    </main>
  )
}

export default App
