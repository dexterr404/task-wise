import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeamTasks, updateTeamTask, editMultipleTeamTask, archiveTeamTask, unArchiveTeamTask, deleteTeamTask, createTeamTask, updateDoneTeamTask, updateUndoneTeamTask, duplicatTeamTask, updateTeamSubtask } 
from "../api/teamTaskService";
import { toast } from "react-hot-toast";
import { useTeamSocket } from "./useTeamSocket";
import { useCallback,useMemo } from "react";
import { useSelector } from "react-redux"

export const useTeamTasks = (teamId) => {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user);

  // Fetch team tasks
  const { data, isLoading: isFetching, error } = useQuery({
    queryKey: ["teamTasks", teamId],
    queryFn: () => getTeamTasks(teamId),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    keepPreviousData: true,
    retry: (failureCount, error) => {
        if (error?.response?.status === 429 || error?.code === "ERR_BAD_REQUEST") return false;
        return failureCount < 3;
    },
  })

  // Add team task mutation
  const addMutation = useMutation({
    mutationFn: ({ title, description, deadline, priority, subtasks }) =>
        createTeamTask( teamId, title, description, deadline, priority, subtasks),
    onSuccess: () => {
        queryClient.invalidateQueries(["teamTasks", teamId]);
        toast.success("Task added successfully")
    },
    onError: (error) => {
          if (error?.response?.status === 429) return;
          toast.error("Failed add task");
      }
  });

  //Update ui when data mutated by updating
  const updateMutation = useMutation({
    mutationFn: ({ taskId, ...updatedData }) =>
        updateTeamTask(teamId, taskId, updatedData),
    onSuccess: () => {
        queryClient.invalidateQueries(['teamTasks', teamId]);
    },
    onError: (error) => {
        if (error?.response?.status === 429) return;
        toast.error("Failed update task");
    }
  });

  const batchUpdateMutation = useMutation({
    mutationFn: (tasks) => editMultipleTeamTask(teamId, tasks),
    onSuccess: () => {
      queryClient.invalidateQueries(['teamTasks', teamId]);
    },
    onError: (error) => {
      if (error?.response?.status === 429) return;
      toast.error("Failed to update tasks");
    },
  });

  // Delete team task mutation
  const deleteMutation = useMutation({
    mutationFn: ({ taskId }) => deleteTeamTask(teamId, taskId),
    onSuccess: () => {
        queryClient.invalidateQueries(["teamTasks", teamId]);
        toast.success("Task deleted successfully");
    },
    onError: (error) => {
        if (error?.response?.status === 429) return;
        toast.error("Failed delete task");
    }
  })

  // Archive team task mutation
  const archiveMutation = useMutation({
    mutationFn: ({ taskId }) => archiveTeamTask(teamId, taskId),
    onSuccess: () => {
        queryClient.invalidateQueries(["teamTasks", teamId]);
        toast.success("Task archived successfully");
    },
    onError: (error) => {
        if (error?.response?.status === 429) return;
        toast.error("Failed archive task");
    }
  });

  // Unarchive team task mutation
  const unArchiveMutation = useMutation({
    mutationFn: ({ taskId }) => unArchiveTeamTask(teamId, taskId),
    onSuccess: () => {
        queryClient.invalidateQueries(["teamTasks", teamId])
        toast.success("Task unarchived successfully");
    },
    onError: (error) => {
        if (error?.response?.status === 429) return;
        toast.error("Failed unarchive task");
    }
  });

  //Mutate ui when task status changed to done
  const updateDoneMutation = useMutation({
      mutationFn: ({ taskId, updatedTask }) =>
          updateDoneTeamTask( teamId, taskId, updatedTask),
      onSuccess: () => {
          queryClient.invalidateQueries(["teamTasks", teamId]);
          toast.success("Task updated successfully");
      },
      onError: (error) => {
          if (error?.response?.status === 429) return;
          toast.error("Failed to update task");
      }
  })

  //Mutate ui when task status changed to done
  const updateUndoneMutation = useMutation({
      mutationFn: ({ taskId, updatedTask }) =>
          updateUndoneTeamTask( teamId, taskId, updatedTask),
      onSuccess: () => {
          queryClient.invalidateQueries(["teamTasks", teamId]);
          toast.success("Task updated successfully");
      },
      onError: (error) => {
          if (error?.response?.status === 429) return;
          toast.error("Failed to update task");
      }
  })

  //Mutate ui when task is duplicated
  const duplicateMutation = useMutation({
    mutationFn: ({newTask}) =>
      duplicatTeamTask(teamId, newTask),
    onSuccess: () => {
          queryClient.invalidateQueries(["teamTasks", teamId]);
          toast.success("Task duplicated successfully");
      },
      onError: (error) => {
          if (error?.response?.status === 429) return;
          toast.error("Failed to duplicate task");
      }
  })

  //Mutate ui when subtask updated
  const updateSubtaskMutation = useMutation({
      mutationFn: ({ taskId, updatedTask }) =>
          updateTeamSubtask(teamId, taskId, updatedTask),
      onSuccess: () => {
          queryClient.invalidateQueries(['teamTasks', teamId]);
          toast.success("Subtask updated successfully");
      },
      onError: (error) => {
          if (error?.response?.status === 429) return;
          toast.error("Failed to update subtask");
      }
  })

  const handleTaskCreated = useCallback((data) => {
    if (data.updatedBy?.id === user.id) return;
    console.log('Task created via socket:', data);
    queryClient.invalidateQueries(['teamTasks', teamId]);
  }, [teamId, queryClient]);

  const handleTaskUpdated = useCallback((data) => {
    if (data.updatedBy?.id === user.id) return;
    console.log('Task updated via socket:', data);
    queryClient.invalidateQueries(['teamTasks', teamId]);
  }, [teamId, queryClient]);

  const handleTaskDeleted = useCallback((data) => {
    if (data.updatedBy?.id === user.id) return;
    console.log('Task deleted via socket:', data);
    queryClient.invalidateQueries(['teamTasks', teamId]);
  }, [teamId, queryClient]);

  const handleTasksReordered = useCallback((data) => {
    if (data.updatedBy?.id === user.id) return;
    console.log('Tasks reordered via socket');
    queryClient.invalidateQueries(['teamTasks', teamId]);
  }, [teamId, queryClient]);

  const handleSubtaskUpdated = useCallback((data) => {
    if (data.updatedBy?.id === user.id) return;
    console.log('Subtask updated via socket:', data);
    queryClient.invalidateQueries(['teamTasks', teamId]);
  }, [teamId, queryClient]);

  const handleTaskArchived = useCallback((data) => {
    if (data.updatedBy?.id === user.id) return;
    console.log('Task archived via socket:', data);
    queryClient.invalidateQueries(['teamTasks', teamId]);
  }, [teamId, queryClient]);

  const handleTaskUnarchived = useCallback((data) => {
    if (data.updatedBy?.id === user.id) return;
    console.log('Task unarchived via socket');
    queryClient.invalidateQueries(['teamTasks', teamId]);
  }, [teamId, queryClient]);

  // Pass stable callbacks object
  const socketCallbacks = useMemo(() => ({
  onTaskCreated: handleTaskCreated,
  onTaskUpdated: handleTaskUpdated,
  onTaskDeleted: handleTaskDeleted,
  onTasksReordered: handleTasksReordered,
  onSubtaskUpdated: handleSubtaskUpdated,
  onTaskArchived: handleTaskArchived,
  onTaskUnarchived: handleTaskUnarchived,
  }), [handleTaskCreated, handleTaskUpdated, handleTaskDeleted, 
      handleTasksReordered, handleSubtaskUpdated, handleTaskArchived, 
      handleTaskUnarchived]);

  // Connect to socket
  useTeamSocket(teamId, socketCallbacks);

  return {
    tasks: data?.columns || {},
    isFetching,
    error,
    onAddTask: (taskData) => addMutation.mutateAsync(taskData),
    onEditTask: (taskData) => updateMutation.mutateAsync(taskData),
    onEditTasksBatch: (tasks) => batchUpdateMutation.mutateAsync(tasks),
    onArchiveTask: archiveMutation.mutateAsync,
    onUnArchiveTask: unArchiveMutation.mutateAsync,
    onDeleteTask: deleteMutation.mutateAsync,
    onDoneTask: updateDoneMutation.mutateAsync,
    onUndoneTask: updateUndoneMutation.mutateAsync,
    onDuplicateTask: duplicateMutation.mutateAsync,
    onSubtaskUpdate: ({taskId,updatedTask}) => updateSubtaskMutation.mutateAsync({taskId,updatedTask}),
  };
};