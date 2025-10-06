import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const joinedTeamsRef = useRef(new Set());
  const token = localStorage.getItem("token");

  // Initialize singleton socket
  useEffect(() => {
    if (!token || socketRef.current) return;

    const s = io(import.meta.env.VITE_API_URL || 'http://localhost:5001', {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    s.on('connect', () => {
      setSocket(s);
    });

    s.on('disconnect', () => {
      setSocket(null);
      joinedTeamsRef.current.clear(); // clear joined teams on disconnect
    });

    s.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socketRef.current = s;

    return () => {
      s.disconnect();
      socketRef.current = null;
      setSocket(null);
      joinedTeamsRef.current.clear();
    };
  }, [token]);

  // Join a team safely
  const joinTeam = (teamId) => {
    if (!socket || joinedTeamsRef.current.has(teamId)) return;

    socket.emit('join:team', teamId);
    joinedTeamsRef.current.add(teamId);
  };

  // Leave a team safely
  const leaveTeam = (teamId) => {
    if (!socket || !joinedTeamsRef.current.has(teamId)) return;

    socket.emit('leave:team', teamId);
    joinedTeamsRef.current.delete(teamId);
  };

  return (
    <SocketContext.Provider value={{ socket, joinTeam, leaveTeam }}>
      {children}
    </SocketContext.Provider>
  );
}

// Hook to access socket and join/leave helpers
export function useSocket() {
  return useContext(SocketContext);
}
