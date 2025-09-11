import { useState } from 'react'
import { Routes,Route,useLocation,matchPath } from 'react-router-dom'
import SideBar from './components/layout/SideBar'
import Personal from './pages/Personal'
import Teams from './pages/Teams.jsx'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import InvitePage from './pages/InvitePage.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  const hideSidebar = location.pathname === "/login" || location.pathname === "/register" || matchPath("/teams/invite/:inviteToken", location.pathname);
  return (
    <QueryClientProvider client={queryClient}>
      <main className='relative'>
      {!hideSidebar && <SideBar />}
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path='/dashboard/:userId' element={<Dashboard />}/>
        <Route path='/personal/:userId' element={<Personal />}/>
        <Route path='/teams/:teamId' element={<Teams />}/>
        <Route path='/teams/invite/:inviteToken' element={<InvitePage />}/>
      </Routes>
      </main>
    </QueryClientProvider>
  )
}

export default App
