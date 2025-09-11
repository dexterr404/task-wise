import { useState,useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ViewKanbanOutlined,TableRows,FormatListBulleted } from "@mui/icons-material";
import { getTeamTasks,createTeamTask,updateTeamTask,deleteTeamTask } from "../../api/teamTaskService";

import CreateTask from "../../features/task/CreateTaskModal";
import TeamTaskKanbanCard from "./TeamTaskKanbanCard";

export function TeamTasks({team}) {
    const [isCreateTeamTask, setIsCreateTeamTask] = useState(false);
    const [columns, setColumns] = useState({});
    const [openMenuId, setOpenMenuId] = useState(null);

    const queryClient = useQueryClient();

    //Fetch tasks
    const { data, isLoading, error } = useQuery({
        queryKey: ["teamTasks", team._id],
        queryFn: () => getTeamTasks(team._id),
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
        mutationFn: ({ teamId, taskId, title, description, priority, deadline, column, order }) =>
            updateTeamTask(teamId, taskId, title, description, priority, deadline, column, order),
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

    // Save to the database and update ui after dragging
    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = source.droppableId;
        const destCol = destination.droppableId;

        const newColumns = { ...columns };
        const sourceItems = Array.from(newColumns[sourceCol]);
        const destItems = sourceCol === destCol ? sourceItems : Array.from(newColumns[destCol]);

        // 1. Remove from source
        const [moved] = sourceItems.splice(source.index, 1);

        // 2. Insert into destination
        destItems.splice(destination.index, 0, moved);

        // 3. Update columns locally
        newColumns[sourceCol] = sourceCol === destCol ? destItems : sourceItems;
        newColumns[destCol] = destCol !== sourceCol ? destItems : newColumns[destCol];

        setColumns(newColumns);

        // 4. Reassign order + column for all tasks in destination
        const reorderedTasks = newColumns[destCol].map((task, index) => ({
            ...task,
            order: index,
            column: destCol,
        }));

        // 5. Also fix orders in sourceCol if moved across columns
        if (sourceCol !== destCol) {
            const reOrderedSourceTasks = newColumns[sourceCol].map((task, index) => ({
            ...task,
            order: index,
            column: sourceCol,
            }));

            reOrderedSourceTasks.forEach((task) => {
            handleEditTask({taskId: task._id, ...task});
            });
        }

        // 6. Send updates for destination column
        reorderedTasks.forEach((task) => {
            handleEditTask({taskId: task._id, ...task});
        });
    };


    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error loading tasks</p>;

    return<section className="flex flex-col gap-4 w-full">
        <section className="flex justify-between items-center">
            <div>
                <Button sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
                    <ViewKanbanOutlined fontSize="small"/>Kanban
                </Button>
                <Button sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
                    <TableRows fontSize="small"/>Table
                </Button>
                <Button sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
                    <FormatListBulleted fontSize="small"/>List
                </Button>
            </div>
            <Button
            onClick={() => setIsCreateTeamTask(true)}
            variant="contained" sx={{ fontSize: "12px", textTransform: "none", backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#388E3C" },  color: "white", paddingY: "2px"}}>
                Add task
            </Button>
        </section>
        <section className="flex justify-between">
            <DragDropContext onDragEnd={handleDragEnd}>
            {Object.entries(columns).map(([colName, tasks]) => (
                <Droppable key={colName} droppableId={colName}>
                {(provided) => (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 p-3 bg-white"
                    >
                    <h3>{colName}</h3>

                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                        <TeamTaskKanbanCard 
                            key={task._id}
                            task={task}
                            team={team}
                            index={index}
                            openMenuId={openMenuId}
                            setOpenMenuId={setOpenMenuId}
                            handleDelete={() => handleDeleteTask(task)}
                            handleEdit={(taskData) => handleEditTask({ taskId: task._id, ...taskData })}
                        />
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm">No task</div>
                    )}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            ))}
            </DragDropContext>
        </section>
        <CreateTask onCreateTask={(taskData) => addTaskMutation.mutateAsync({ teamId: team._id, ...taskData })} team={team} open={isCreateTeamTask} onClose={() => setIsCreateTeamTask(false)}/>
    </section>
}

export default TeamTasks;