import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import SideBar from './components/SideBar'
import Task from './pages/Task'
import Dashboard from './pages/Dashboard'
import AddTask from './features/task/createTask/CreateTaskForm'
import DeleteTaskModal from './features/task/deleteTask/DeleteTaskModal'
function App() {

  return (
    <main className='relative'>
    <SideBar></SideBar>
    <Routes>
      <Route path='/Dashboard' element={<Dashboard />}/>
      <Route path='/Task' element={<Task />}>
         <Route path='/Task/create' element={<AddTask />}/>
         <Route path='/Task/delete/:id' element={<DeleteTaskModal />}/>
      </Route>
    </Routes>
    </main>
  )
}

export default App
