import { useRef, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

export function useTeamSocket(teamId, callbacks = {}) {
  const { socket, joinTeam, leaveTeam } = useSocket();
  const callbacksRef = useRef(callbacks);

  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  useEffect(() => {
    if (!socket || !teamId) return;

    joinTeam(teamId);

    const events = {
      'task:created': (...args) => callbacksRef.current.onTaskCreated?.(...args),
      'task:updated': (...args) => callbacksRef.current.onTaskUpdated?.(...args),
      'task:deleted': (...args) => callbacksRef.current.onTaskDeleted?.(...args),
      'tasks:reordered': (...args) => callbacksRef.current.onTasksReordered?.(...args),
      'subtask:updated': (...args) => callbacksRef.current.onSubtaskUpdated?.(...args),
      'task:archived': (...args) => callbacksRef.current.onTaskArchived?.(...args),
      'task:unarchived': (...args) => callbacksRef.current.onTaskUnarchived?.(...args),
      'user:online': (...args) => callbacksRef.current.onUserOnline?.(...args),
      'user:offline': (...args) => callbacksRef.current.onUserOffline?.(...args),
    };

    Object.entries(events).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      leaveTeam(teamId);
      Object.keys(events).forEach(event => socket.off(event));
    };
  }, [socket, teamId, joinTeam, leaveTeam]);
}
