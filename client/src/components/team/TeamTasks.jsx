import { useState,useEffect,useRef } from "react";
import { useQuery, useQueryClient} from "@tanstack/react-query";
import { Button,IconButton, Tooltip, Typography } from "@mui/material";
import { Window,TableRows,FormatListBulleted, Archive,AddBox, FilterList, Sort } from "@mui/icons-material";
import { getTeamTasks} from "../../api/teamTaskService";
import { useTeamTasks } from "../../hooks/useTeamTasks";

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
    const queryClient = useQueryClient();
    const { onAddTask,onEditTasksBatch } = useTeamTasks(team._id);

    const [isCreateTeamTask, setIsCreateTeamTask] = useState(false);
    const [activeSection, setActiveSection] = useState("card")
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState([]);
    const [sort, setSort] = useState("none");
    const [openMenu, setOpenMenu] = useState(null);
    
    //Fetch tasks
    const { data, isLoading, error } = useQuery({
        queryKey: ["teamTasks", team._id, searchQuery, filters, sort],
        queryFn: () => getTeamTasks(team._id, searchQuery, filters, sort),
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: (failureCount, error) => {
            if (error?.response?.status === 429) return false;
            return failureCount < 3;
        },
    });

    useEffect(() => {
    if (activeSection === "card") {
        setFilters([]);
        setSort("none");
        setOpenMenu(null);
    }
    }, [activeSection]);

    const debounceRef = useRef(null);

    const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const newColumns = { ...data.columns };
    const sourceItems = Array.from(newColumns[sourceCol]);
    const destItems = sourceCol === destCol ? sourceItems : Array.from(newColumns[destCol]);

    // Remove from source
    const [movedTask] = sourceItems.splice(source.index, 1);

    // Insert into destination
    destItems.splice(destination.index, 0, movedTask);

    // Update columns locally
    newColumns[sourceCol] = sourceCol === destCol ? destItems : sourceItems;
    newColumns[destCol] = sourceCol !== destCol ? destItems : newColumns[destCol];

    queryClient.setQueryData(['teamTasks', team._id, searchQuery, filters, sort], (old) => ({
        ...old,
        columns: newColumns
    }));

    // Collect all tasks that actually changed
    const tasksToUpdate = [];
    Object.entries(newColumns).forEach(([colId, tasks]) => {
        tasks.forEach((task, index) => {
        if (task.order !== index || task.status !== colId) {
            tasksToUpdate.push({ taskId: task._id, order: index, status: colId });
        }
        });
    });

    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Call batch update
    debounceRef.current = setTimeout(() => {
      if (tasksToUpdate.length > 0) {
        onEditTasksBatch(tasksToUpdate);
      }
    }, 5000);
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
        <section className="flex justify-between items-center max-sm:flex-col max-sm:items-start border-b-1 border-border">
            <div className="max-sm:flex max-sm:justify-between max-sm:w-full max-md:flex-col">
                <div>
                    <Button
                    onClick={() => setActiveSection("card")}
                    sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    color: "var(--color-text-secondary)",
                    backgroundColor:
                        activeSection === "card" ? "var(--color-accent)" : "var(--color-surface)",
                    }}>
                        <Window fontSize="small"/>Card
                    </Button>
                    <Button
                    onClick={() => setActiveSection("table")}
                    sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    color: "var(--color-text-secondary)",
                    backgroundColor:
                        activeSection === "table" ? "var(--color-accent)" : "var(--color-surface)",
                    }}>
                        <TableRows fontSize="small"/>Table
                    </Button>
                    <Button
                    onClick={() => setActiveSection("list")}
                    sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    color: "var(--color-text-secondary)",
                    backgroundColor:
                        activeSection === "list" ? "var(--color-accent)" : "var(--color-surface)",
                    }}>
                        <FormatListBulleted fontSize="small"/>List
                    </Button>
                    <Button
                    onClick={() => setActiveSection("archive")}
                    sx={{
                    fontSize: "12px",
                    textTransform: "none",
                    color: "var(--color-text-secondary)",
                    backgroundColor:
                        activeSection === "archive" ? "var(--color-accent)" : "var(--color-surface)",
                    }}>
                        <Archive fontSize="small"/>Archive
                    </Button>
                    <Button
                    onClick={() => setIsCreateTeamTask(true)}
                    sx={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-secondary)"}}
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
                            sx={{ color: openMenu === "filter" ? "#1D4ED8" : "var(--color-text-primary)" }}
                            >
                                <FilterList fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Sort">
                            <IconButton
                            onClick={() => setOpenMenu(openMenu === "sort" ? null : "sort")}
                            sx={{ color: openMenu === "sort" ? "#1D4ED8" : "var(--color-text-primary)" }}
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
                    <TeamTaskKanban onDragEnd={handleDragEnd} columns={data?.columns} team={team} />
                )
            }
            {
                activeSection === "archive" && (
                    <TeamTaskArchive columns={data?.columns} team={team}/>
                )
            }
            {
                activeSection === "table" && (
                    <TeamTaskTable tasks={data?.tasks} team={team}/>
                )
            }
            {
                activeSection === "list" && (
                    <TeamTaskList tasks={data?.tasks} team={team}/>
                )
            }
        </section>
        <CreateTask onAddTask={onAddTask} team={team} open={isCreateTeamTask} onClose={() => setIsCreateTeamTask(false)}/>
    </section>
}

export default TeamTasks;