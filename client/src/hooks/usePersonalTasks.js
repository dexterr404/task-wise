import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {  fetchAllTasks, createTask, deleteTask, editTask, updateSubTask, 
updateDoneTask, updateUndoneTask, duplicateTask, 
archiveTask,unArchiveTask} from "../api/taskService";

export const usePersonalTasks = (userId,sort,filters,searchQuery) => {
    const queryClient = useQueryClient();

    //Fetch tasks
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["personalTasks", userId, sort, JSON.stringify(filters), searchQuery],
        queryFn: () => fetchAllTasks(userId, sort, filters, searchQuery),
        keepPreviousData: true,
        staleTime: 1000 * 20,
        retry: (failureCount, error) => {
            if (error?.response?.status === 429 || error?.code === "ERR_BAD_REQUEST") return false;
            return failureCount < 3;
        },
    });

    //Mutation ui to add a task
    const addTaskMutation = useMutation({
        mutationFn: ({ userId, title, description, deadline, priority, subtasks }) =>
            createTask( userId, title, description, deadline, priority, subtasks),
        onSuccess: () => {
            queryClient.invalidateQueries(["personalTasks", userId]);
            toast.success("Task added successfully")
        },
        onError: (error) => {
            if (error?.response?.status === 429) return;
            toast.error("Failed to add task");
        }
    });

    //Mutate ui when data mutated by deleting
    const deleteTaskMutation = useMutation({
        mutationFn: ({ taskId }) =>
            deleteTask(userId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries(['personalTasks', userId]);
            toast.success("Task deleted successfully")
        },
        onError: (error) => {
            if (error?.response?.status === 429) return;
            toast.error("Failed delete task");
        }
    })

    //Mutate ui when task status changed to done
    const updateDoneMutation = useMutation({
        mutationFn: ({ taskId, updatedTask }) =>
            updateDoneTask( userId, taskId, updatedTask),
        onSuccess: () => {
            queryClient.invalidateQueries(['personalTasks', userId]);
        },
        onError: (error) => {
            if (error?.response?.status === 429) return;
            toast.error("Failed to update task");
        }
    })

    //Mutate ui when task status was undone
    const updateUndoneMutation = useMutation({
        mutationFn: ({ taskId, updatedTask }) =>
            updateUndoneTask( userId, taskId, updatedTask ),
        onSuccess: () => {
            queryClient.invalidateQueries(['personalTasks', userId]);
            toast.success("Task updated successfully");
        },
        onError: (error) => {
            if (error?.response?.status === 429) return;
            toast.error("Failed to update task");
        }
    })

    //Mutate ui when task is duplicated
    const duplicateTaskMutation = useMutation({
        mutationFn: ({ newTask }) =>
            duplicateTask( userId, newTask),
        onSuccess: () => {
            queryClient.invalidateQueries(['personalTasks', userId]);
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
            updateSubTask(userId, taskId, updatedTask),
        onSuccess: () => {
            queryClient.invalidateQueries(['personalTasks', userId]);
            toast.success("Subtask updated successfully");
        },
        onError: (error) => {
            if (error?.response?.status === 429) return;
            toast.error("Failed to update subtask");
        }
    })

    //Mutate ui when data mutated by updating
    const editTaskMutation = useMutation({
        mutationFn: ({taskId, ...updatedData}) =>
            editTask(userId, taskId, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries(['personalTasks', userId])
        },
        onError: (error) => {
            if (error?.response?.status === 429) return;
            toast.error("Failed to update task");
        }
    })

     // Archive team task mutation
    const archiveMutation = useMutation({
    mutationFn: ({ taskId }) => 
        archiveTask(userId, taskId),
    onSuccess: () => {
        queryClient.invalidateQueries(["personalTasks", userId]);
        toast.success("Task archived successfully");
    },
    onError: (error) => {
        if (error?.response?.status === 429) return;
        toast.error("Failed archive task");
    }
    });

     // Archive team task mutation
    const unArchiveMutation = useMutation({
    mutationFn: ({ taskId }) => unArchiveTask(userId, taskId),
    onSuccess: () => {
        queryClient.invalidateQueries(["personalTasks", userId]);
        toast.success("Task unarchived successfully");
    },
    onError: (error) => {
        if (error?.response?.status === 429) return;
        toast.error("Failed archive task");
    }
    });

    return {
        tasks: data,
        isQueryLoading: isLoading,
        error,
        isError,
        onAddTask: (taskData) => addTaskMutation.mutateAsync(taskData),
        onDeleteTask: deleteTaskMutation.mutateAsync,
        onDoneTask: updateDoneMutation.mutateAsync,
        onUndoneTask: updateUndoneMutation.mutateAsync,
        onDuplicateTask: duplicateTaskMutation.mutateAsync,
        onSubtaskUpdate: ({taskId,updatedTask}) => updateSubtaskMutation.mutateAsync({taskId,updatedTask}),
        onEditTask: (updatedTask) =>  editTaskMutation.mutateAsync(updatedTask),
        onArchiveTask: archiveMutation.mutateAsync,
        onUnArchiveTask: unArchiveMutation.mutateAsync
    }
}