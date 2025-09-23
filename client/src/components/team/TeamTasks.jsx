import { useState,useEffect } from "react";
import { useQuery} from "@tanstack/react-query";
import { Button,IconButton, Tooltip, Typography } from "@mui/material";
import { Window,TableRows,FormatListBulleted, Archive,AddBox, FilterList, Sort } from "@mui/icons-material";
import { getTeamTasks} from "../../api/teamTaskService";
import { useTeamTasks } from "../../hooks/useTeamTasks";
import { colors } from "../../data/colors";

import CreateTask from "../../features/task/CreateTaskModal";
import TeamTaskKanban from "./TeamTaskKanban";
import TeamTaskArchive from "./TeamTaskArchive";
import TeamTaskTable from "./TeamTaskTable";
import TeamTaskList from "./TeamTaskList";
import SearchTaskInput from "../../features/task/SearchTaskInput";
import FilterMenu from "../dropdownMenu/FilterMenu";
import SortMenu from "../dropdownMenu/SortMenu";
import TeamTaskSkeleton from "../skeleton/TeamTaskSkeleton";


export function TeamTasks({team}) {
    const { onAddTask,onEditTask } = useTeamTasks(team._id);

    const [isCreateTeamTask, setIsCreateTeamTask] = useState(false);
    const [columns, setColumns] = useState({});
    const [activeSection, setActiveSection] = useState("card")
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState([]);
    const [sort, setSort] = useState("none");
    const [openMenu, setOpenMenu] = useState(null);
    
    //Fetch tasks
    const { data, isLoading, error } = useQuery({
        queryKey: ["teamTasks", team._id,searchQuery,filters,sort],
        queryFn: () => getTeamTasks(team._id,searchQuery,filters,sort),
    });

    useEffect(() => {
    if (activeSection === "card") {
        setFilters([]);
        setSort("none");
        setOpenMenu(null);
    }
    }, [activeSection]);

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

    const handleSortChange = (option) => setSort(option);

    if (isLoading) return <div className="flex w-full h-dvh">
        <TeamTaskSkeleton/>
    </div>
    

    if (error){
        return<main className="flex w-screen h-screen justify-center items-center">
                <Typography variant="body3">Something went wrong while loading tasks.</Typography>
            </main>;
    } 

    return<section className="flex flex-col gap-4 h-full w-full">
        <section className="flex justify-between items-center max-sm:flex-col max-sm:items-start border-x-1 border-b-1 border-gray-200">
            <div className="max-sm:flex max-sm:justify-between max-sm:w-full max-md:flex-col">
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
            <div className="flex max-sm:items-center px-2   ">
                <div className="flex items-center justify-center max-sm:w-full max-sm:py-1 relative">
                    <SearchTaskInput searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                </div>
                <div className="flex">
                    <div className={`relative flex ${(activeSection === "archive" || activeSection === "card") && "hidden"}`}>
                        <Tooltip title="Filter">
                            <IconButton
                            onClick={() => setOpenMenu(openMenu === "filter" ? null : "filter")}
                            sx={{ color: openMenu === "filter" ? "#1D4ED8" : "gray" }}
                            >
                                <FilterList fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Sort">
                            <IconButton
                            onClick={() => setOpenMenu(openMenu === "sort" ? null : "sort")}
                            sx={{ color: openMenu === "sort" ? "#1D4ED8" : "gray" }}
                            >
                                <Sort fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                        {openMenu === "filter" && <FilterMenu options={["Backlog", "To Do", "Doing", "Review", "Done"]} selected={filters} onChange={setFilters} />}
                        {openMenu === "sort" && <SortMenu  onChange={(value) => {handleSortChange(value);setSort(value)}}sort={sort}/>}
                    </div>
                </div>   
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
                    <TeamTaskTable tasks={data.tasks} team={team}/>
                )
            }
            {
                activeSection === "list" && (
                    <TeamTaskList tasks={data.tasks} team={team}/>
                )
            }
        </section>
        <CreateTask onAddTask={onAddTask} team={team} open={isCreateTeamTask} onClose={() => setIsCreateTeamTask(false)}/>
    </section>
}

export default TeamTasks;