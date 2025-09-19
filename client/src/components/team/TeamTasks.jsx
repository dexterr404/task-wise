import { useState,useEffect } from "react";
import { useQuery} from "@tanstack/react-query";
import { Button } from "@mui/material";
import { Window,TableRows,FormatListBulleted, Archive,AddBox } from "@mui/icons-material";
import { getTeamTasks} from "../../api/teamTaskService";
import { useTeamTasks } from "../../hooks/useTeamTasks";
import { colors } from "../../data/colors";

import CreateTask from "../../features/task/CreateTaskModal";
import TeamTaskKanban from "./TeamTaskKanban";
import TeamTaskArchive from "./TeamTaskArchive";
import TeamTaskTable from "./TeamTaskTable";
import TeamTaskList from "./TeamTaskList";
import SearchTaskInput from "../../features/task/SearchTaskInput";

export function TeamTasks({team}) {
    const { onAddTask,onEditTask } = useTeamTasks(team._id);

    const [isCreateTeamTask, setIsCreateTeamTask] = useState(false);
    const [columns, setColumns] = useState({});
    const [activeSection, setActiveSection] = useState("card")
    const [searchQuery, setSearchQuery] = useState("");
    
    //Fetch tasks
    const { data, isLoading, error } = useQuery({
        queryKey: ["teamTasks", team._id,searchQuery],
        queryFn: () => getTeamTasks(team._id,searchQuery),
    });

    //Set columns for tasks
    useEffect(() => {
        if (data?.columns) setColumns(data.columns);
    }, [data]);

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
            if (task.order !== index || task.status !== columnId) {
                onEditTask({ taskId: task._id, order: index, status: columnId });
            }
        });
    };

    // 5. Update source and destination
    updateTasks(newColumns[sourceCol], sourceCol);
        if (sourceCol !== destCol) updateTasks(newColumns[destCol], destCol);
    };

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error loading tasks</p>;

    return<section className="flex flex-col gap-4 h-full w-full">
        <section className="flex justify-between items-center max-sm:flex-col max-sm:items-start border-x-1 border-b-1 border-gray-200">
            <div className="max-sm:flex max-sm:justify-between max-sm:w-full max-xs:flex-col">
                <div>
                    <Button
                    onClick={() => setActiveSection("card")}
                    sx={{ fontSize: "12px", textTransform: "none", color: "gray", backgroundColor: activeSection === "card" ? colors.gray : "white"}}>
                        <Window fontSize="small"/>Card
                    </Button>
                    <Button
                    onClick={() => setActiveSection("table")}
                    sx={{ fontSize: "12px", textTransform: "none", color: "gray", backgroundColor: activeSection === "table" ? colors.gray : "white"}}>
                        <TableRows fontSize="small"/>Table
                    </Button>
                    <Button
                    onClick={() => setActiveSection("list")}
                    sx={{ fontSize: "12px", textTransform: "none", color: "gray", backgroundColor: activeSection === "list" ? colors.gray : "white"}}>
                        <FormatListBulleted fontSize="small"/>List
                    </Button>
                </div>
                <div className="max-sm:block sm:hidden">
                    <Button
                    onClick={() => setActiveSection("archive")}
                    sx={{ fontSize: "12px", textTransform: "none", color: "gray", backgroundColor: activeSection === "archive" ? colors.gray : "white"}}>
                        <Archive fontSize="small"/>Archive
                    </Button>
                    <Button
                    onClick={() => setIsCreateTeamTask(true)}
                    sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
                    >
                        <AddBox fontSize="small"/> Create
                    </Button>
                </div>
            </div>
            <div className="flex justify-center max-sm:w-full max-sm:py-1">
                <SearchTaskInput searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            </div>
            <div className="flex gap-3 items-center max-sm:hidden">
                <Button
                 onClick={() => setActiveSection("archive")}
                 sx={{ fontSize: "12px", textTransform: "none", color: "gray", backgroundColor: activeSection === "archive" ? colors.gray : "white"}}>
                    <Archive fontSize="small"/>Archive
                </Button>
                <Button
                onClick={() => setIsCreateTeamTask(true)}
                sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
                >
                    <AddBox fontSize="small"/> Create
                </Button>
            </div>
        </section>
        <section>
            {/*Change view depending on user choice*/}
            {
                activeSection === "card" && (
                    <TeamTaskKanban onDragEnd={handleDragEnd} columns={columns} team={team} />
                )
            }
            {
                activeSection === "archive" && (
                    <TeamTaskArchive columns={columns} team={team}/>
                )
            }
            {
                activeSection === "table" && (
                    <TeamTaskTable columns={columns} team={team}/>
                )
            }
            {
                activeSection === "list" && (
                    <TeamTaskList columns={columns} team={team}/>
                )
            }
        </section>
        <CreateTask onAddTask={onAddTask} team={team} open={isCreateTeamTask} onClose={() => setIsCreateTeamTask(false)}/>
    </section>
}

export default TeamTasks;