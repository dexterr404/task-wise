import { useState,useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Typography } from "@mui/material";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Window,TableRows,FormatListBulleted, Archive } from "@mui/icons-material";
import { getTeamTasks,createTeamTask,updateTeamTask,deleteTeamTask, archiveTeamTask, unArchiveTeamTask } from "../../api/teamTaskService";

import CreateTask from "../../features/task/CreateTaskModal";
import TeamTaskKanbanCard from "./TeamTaskKanbanCard";
import RateLimitedUI from "../ui/RateLimitedUI";
import { TeamTaskKanban } from "./TeamTaskKanban";
import TeamTaskArchive from "./TeamTaskArchive";

export function TeamTasks({team}) {
    const queryClient = useQueryClient();

    const [isCreateTeamTask, setIsCreateTeamTask] = useState(false);
    const [columns, setColumns] = useState({});
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [activeSection, setActiveSection] = useState("card")
    
    //Fetch tasks
    const { data, isLoading, error } = useQuery({
        queryKey: ["teamTasks", team._id],
        queryFn: () => getTeamTasks(team._id),
        onError: (error) => {
            if (error.response?.status === 429) {
            setIsRateLimited(true);
            }
        },
    });

    //Mutation ui to add a task
    const addTaskMutation = useMutation({
        mutationFn: ({ teamId, title, description, deadline, priority, subtasks }) =>
            createTeamTask( teamId, title, description, deadline, priority, subtasks),
        onSuccess: () => {
            queryClient.invalidateQueries(["teamTasks", team._id]);
            setIsCreateTeamTask(false);
        }
    });

    //Update ui when data mutated by updating
    const updateTaskMutation = useMutation({
        mutationFn: ({ teamId, taskId, ...updatedData }) =>
            updateTeamTask(teamId, taskId, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries(['teamTasks', team._id]);
        },
        onError: (error) => {
            console.error('Failed to update task:', error);
        },
    });

    //Mutate ui when data mutated by deleting
    const deleteTaskMutation = useMutation({
        mutationFn: ({ teamId, taskId }) =>
            deleteTeamTask(teamId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries(['teamTasks', team._id]);
        }
    })

    //Mutate ui when a task is archived
    const archiveTaskMutation = useMutation({
        mutationFn: ({ teamId, taskId }) =>
            archiveTeamTask(teamId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries(['teamTasks', team._id]);
        }
    })

    const unArchiveTaskMutation = useMutation({
        mutationFn: ({ teamId, taskId }) =>
            unArchiveTeamTask(teamId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries(['teamTasks', team._id]);
        }
    })

    //Set columns for tasks
    useEffect(() => {
        if (data?.columns) setColumns(data.columns);
    }, [data]);

    const handleEditTask = ({ taskId, ...updatedData }) => {
        updateTaskMutation.mutate({
            teamId: team._id,
            taskId,
            ...updatedData
        });
    };

    const handleDeleteTask = (task) => {
        deleteTaskMutation.mutate({
            teamId: team._id,
            taskId: task._id
        });
    }

    const handleArchiveTask = (task) => {
        archiveTaskMutation.mutate({
            teamId: team._id,
            taskId: task._id
        })
    }

    const handleUnarchiveTask = (task) => {
        unArchiveTaskMutation.mutate({
            teamId: team._id,
            taskId: task._id
        })
    }

    const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const newColumns = { ...columns };
    const sourceItems = Array.from(newColumns[sourceCol]);
    const destItems = sourceCol === destCol ? sourceItems : Array.from(newColumns[destCol]);

    // 1. Remove from source
    const [movedTask] = sourceItems.splice(source.index, 1);

    // 2. Insert into destination
    destItems.splice(destination.index, 0, movedTask);

    // 3. Update columns locally
    newColumns[sourceCol] = sourceCol === destCol ? destItems : sourceItems;
    newColumns[destCol] = destCol !== sourceCol ? destItems : newColumns[destCol];

    setColumns(newColumns);

    // 4. Helper to update only tasks that actually changed
    const updateTasks = (tasks, columnId) => {
        tasks.forEach((task, index) => {
            // Only update if order or column changed
            if (task.order !== index || task.column !== columnId) {
                handleEditTask({ taskId: task._id, order: index, column: columnId });
            }
        });
    };

    // 5. Update source and destination
    updateTasks(newColumns[sourceCol], sourceCol);
    if (sourceCol !== destCol) updateTasks(newColumns[destCol], destCol);
};


    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error loading tasks</p>;

    return<section className="flex flex-col gap-4 w-full">
        <section className="flex justify-between items-center">
            <div>
                <Button
                 onClick={() => setActiveSection("card")}
                 sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
                    <Window fontSize="small"/>Card
                </Button>
                <Button
                 onClick={() => setActiveSection("table")}
                 sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
                    <TableRows fontSize="small"/>Table
                </Button>
                <Button
                 onClick={() => setActiveSection("list")}
                 sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
                    <FormatListBulleted fontSize="small"/>List
                </Button>
            </div>
            <div className="flex gap-3 items-center">
                <Button
                 onClick={() => setActiveSection("archive")}
                 sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
                    <Archive fontSize="small"/>Archive
                </Button>
                <Button
                onClick={() => setIsCreateTeamTask(true)}
                variant="contained" sx={{ fontSize: "12px", textTransform: "none", backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#388E3C" },  color: "white", paddingY: "2px"}}>
                    Add task
                </Button>
            </div>
        </section>
        <section >
            {
                activeSection === "card" && (
                    <TeamTaskKanban onDragEnd={handleDragEnd} columns={columns} handleDelete={(task) => handleDeleteTask(task)} team={team}handleEdit={(taskId,taskData) => handleEditTask(taskId,taskData)} handleArchive={(task) => handleArchiveTask(task)}/>
                )
            }
            {
                activeSection === "archive" && (
                    <TeamTaskArchive columns={columns} handleUnarchive={(task) => handleUnarchiveTask(task)}/>
                )
            }
        </section>
        {/*Show rate limited ui when too many request*/}
        {
            isRateLimited && <RateLimitedUI/>
        }
        <CreateTask onCreateTask={(taskData) => addTaskMutation.mutateAsync({ teamId: team._id, ...taskData })} team={team} open={isCreateTeamTask} onClose={() => setIsCreateTeamTask(false)}/>
    </section>
}

export default TeamTasks;