import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeamTasks, updateTeamTask, archiveTeamTask, unArchiveTeamTask, deleteTeamTask, createTeamTask, updateDoneTeamTask, updateUndoneTeamTask, duplicatTeamTask, updateTeamSubtask } 
from "../api/teamTaskService";
import { toast } from "react-hot-toast";

export const useTeamTasks = (teamId) => {
  const queryClient = useQueryClient();

  // Fetch team tasks
  const { data, isLoading: isFetching, error } = useQuery({
    queryKey: ["teamTasks", teamId],
    queryFn: () => getTeamTasks(teamId),
  });

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

  return {
    tasks: data?.columns || {},
    isFetching,
    error,
    onAddTask: (taskData) => addMutation.mutateAsync(taskData),
    onEditTask: (taskData) => updateMutation.mutateAsync(taskData),
    onArchiveTask: archiveMutation.mutateAsync,
    onUnArchiveTask: unArchiveMutation.mutateAsync,
    onDeleteTask: deleteMutation.mutateAsync,
    onDoneTask: updateDoneMutation.mutateAsync,
    onUndoneTask: updateUndoneMutation.mutateAsync,
    onDuplicateTask: duplicateMutation.mutateAsync,
    onSubtaskUpdate: ({taskId,updatedTask}) => updateSubtaskMutation.mutateAsync({taskId,updatedTask}),
  };
};