import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Button,Tooltip,IconButton } from "@mui/material";
import { FilterList, Sort, AddBox, Archive, FormatListBulleted } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { usePersonalTasks } from "../hooks/usePersonalTasks";
import { colors } from "../data/colors";

import ProfileAndNotif from "../components/personal/ProfileAndNotif";
import SearchTaskInput from "../features/task/SearchTaskInput";
import Recommended from "../components/personal/Recommended";
import CreateTask from "../features/task/CreateTaskModal";
import FilterMenu from "../components/dropdownMenu/FilterMenu";
import SortMenu from "../components/dropdownMenu/SortMenu";
import TasksList from "../components/personal/TasksList";
import TeamTaskArchive from "../components/team/TeamTaskArchive";

function Task() {
    const user = useSelector((state) => state.user);

    const [isCreateTaskOpen,setIsCreateTaskOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isProfileMenuOpen,setProfileMenuOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [sort,setSort] = useState("none");
    const [filters, setFilters] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSection, setActiveSection] = useState("tasks");

    const { tasks,isQueryLoading, onAddTask } = usePersonalTasks(user.id,sort,filters,searchQuery);

    const handleSortChange = (option) => setSort(option);


    return<main className="flex flex-col h-dvh bg-gray-50 text-gray-600 lg:ml-[200px] font-inter">
        <Toaster position="top-center" reverseOrder={false} />
        <section className="flex items-center justify-between bg-white border-1 border-gray-200 lg:ml-[100px] px-4 py-2 sm:mx-10 relative">
            <h1 className="font-semibold">My tasks</h1>
            <SearchTaskInput setSearchQuery={setSearchQuery} searchQuery={searchQuery} className="relative lg:block max-md:hidden w-[300px]"/>
            <ProfileAndNotif setProfileMenuOpen={setProfileMenuOpen} isProfileMenuOpen={isProfileMenuOpen}/>
        </section>
        <section className="flex justify-center bg-white border-x-1 border-gray-200 sm:mx-10 ">
            <SearchTaskInput  setSearchQuery={setSearchQuery} searchQuery={searchQuery} className="relative md:hidden max-md:block w-[300px] mt-2 z-0"/>
        </section>
        <Recommended setIsCreateTaskOpen={setIsCreateTaskOpen} setSelectedCategory={setSelectedCategory}/>
        <section className="flex justify-between bg-white border-1 border-gray-200 items-center sm:mx-10 lg:ml-[100px] max-sm:flex-col-reverse max-sm:gap-2">
            <div className="flex gap-6">
                <div className={`relative ${activeSection === "archive" && "hidden"} px-4`}>
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
                    {openMenu === "filter" && <FilterMenu options={["Not Started", "Ongoing", "Done"]} selected={filters} onChange={setFilters} />}
                    {openMenu === "sort" && <SortMenu  onChange={(value) => {handleSortChange(value);setSort(value)}}sort={sort}/>}
                </div>
            </div>
            <div className="flex items-center">
                <Button
                onClick={() => setActiveSection("tasks")}
                fontSize="small" sx={{ fontSize: "12px", textTransform: "none", color: "gray", backgroundColor: activeSection === "tasks" ? colors.gray : "white"}}
                >
                    <FormatListBulleted fontSize="small"/> Tasks
                </Button>
                <Button
                onClick={() => setActiveSection("archive")}
                fontSize="small" sx={{ fontSize: "12px", textTransform: "none", color: "gray", backgroundColor: activeSection === "archive" ? colors.gray : "white"}}
                >
                    <Archive fontSize="small"/> Archive
                </Button>
                <Button
                onClick={() => { setSelectedCategory(""); setIsCreateTaskOpen(true);}}
                sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}
                >
                    <AddBox fontSize="small"/> Create
                </Button>
            </div>
            <CreateTask open={isCreateTaskOpen} categoryName={selectedCategory} onClose={()=>setIsCreateTaskOpen(false)} 
             onAddTask={(taskData) => onAddTask({...taskData})}/> 
        </section>
        <section className="flex flex-col lg:ml-[100px] sm:mx-10 flex-1">
            <div className="flex justify-stretch flex-col gap-2 h-full bg-white">
                {
                    activeSection === "tasks" && <TasksList isLoading={isQueryLoading} tasks={tasks}/>
                }
                {
                    activeSection === "archive" && <TeamTaskArchive tasks={tasks} />
                }
            </div>
        </section>
    </main>
}

export default Task