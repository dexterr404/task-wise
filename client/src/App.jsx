import { useState } from 'react'
import { Routes,Route,useLocation,matchPath } from 'react-router-dom'
import SideBar from './components/layout/SideBar'
import Personal from './pages/Personal'
import Teams from './pages/Teams.jsx'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import InvitePage from './pages/InvitePage.jsx'
import GlobalRateLimitHandler from './components/ui/GlobalRateLimitHandler.jsx'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import { SuccessRedirect } from './features/auth/SuccessRedirect.jsx'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const status = error?.response?.status || error?.status;

      if (status === 401) {
        return console.log("Not authorized"); 
      }

      if (status === 429 || error?.code === "ERR_BAD_REQUEST") {
        window.dispatchEvent(new CustomEvent("rateLimited"));
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.log("Mutation error caught globally:", error);
      const status = error?.response?.status || error?.status;

      if (status === 401) {
        return console.log("Not authorized"); 
      }

      if (status === 429 || error?.code === "ERR_BAD_REQUEST") {
        window.dispatchEvent(new CustomEvent("rateLimited"));
      }
    },
  }),
   defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});


function App() {
  const location = useLocation();

  const hideSidebar = location.pathname === "/login" || location.pathname === "/register" || matchPath("/teams/invite/:inviteToken", location.pathname);
  return (
    <QueryClientProvider client={queryClient}>
      <main className='relative'>
      {!hideSidebar && <SideBar />}
      <GlobalRateLimitHandler />
      <Routes>
        <Route path="/auth/success" element={<SuccessRedirect />}/>
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
