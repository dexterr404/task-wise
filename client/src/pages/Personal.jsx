import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Button, Icon, IconButton } from "@mui/material";
import { FilterList, Sort, Add, Archive, FormatListBulleted } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { usePersonalTasks } from "../hooks/usePersonalTasks";

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
    const [isFilterOpen,setIsFilterOpen] = useState(false);
    const [isSortOpen,setIsSortOpen] = useState(false);
    const [sort,setSort] = useState("none");
    const [filters, setFilters] = useState([]);
    const [activeSection, setActiveSection] = useState("tasks");

    const { tasks,isQueryLoading, onAddTask } = usePersonalTasks(user.id,sort,filters);

    const handleSortChange = (option) => setSort(option);


    return<main className="flex flex-col h-dvh bg-gray-50 py-2 text-gray-600 lg:ml-[200px] gap-4 font-inter">
        <Toaster position="top-center" reverseOrder={false} />
        <section className="flex items-center justify-between lg:ml-[100px] p-4 mx-10 relative">
            <h1 className="font-bold text-black text-xl">My Task</h1>
            <SearchTaskInput className="relative lg:block max-md:hidden w-[300px]"/>
            <ProfileAndNotif setProfileMenuOpen={setProfileMenuOpen} isProfileMenuOpen={isProfileMenuOpen}/>
        </section>
        <section className="flex justify-center">
            <SearchTaskInput className="relative md:hidden max-md:block w-[300px] mt-2 z-0"/>
        </section>
        <Recommended setIsCreateTaskOpen={setIsCreateTaskOpen} setSelectedCategory={setSelectedCategory}/>
        <section className="flex justify-between items-center mx-10 lg:ml-[100px] max-sm:flex-col-reverse max-sm:gap-2">
            <div className="flex gap-2">
                <div className="relative">
                    <button className=" bg-gray-800 text-white border-gray-300 px-4 py-1 border-1  rounded-md text-xs font-semibold cursor-pointer hover:opacity-95 active:opacity-90 flex items-center relative"
                    onClick={() => {setIsFilterOpen((prev) => !prev)}}><FilterList fontSize="small"/>Filter</button>
                    {
                        isFilterOpen && <FilterMenu onChange={setFilters}/>
                    }
                </div>
                <div className="relative">
                    <button className=" bg-gray-800 text-white border-gray-300 px-4 py-1 border-1 rounded-md text-xs font-semibold cursor-pointer hover:opacity-95 active:opacity-90 flex items-center"
                    onClick={() => {setIsSortOpen((prev) => !prev)}}><Sort fontSize="small"/>Sort</button>
                    {
                        isSortOpen && <SortMenu onChange={(value) => {
                            handleSortChange(value);
                            setSort(value);
                        }
                        }
                        sort={sort}/>
                    }
                </div>
            </div>
            <div>
                <IconButton
                onClick={() => setActiveSection("archive")}
                >
                    <Archive fontSize="small"/>
                </IconButton>
                <IconButton
                onClick={() => setActiveSection("tasks")}
                >
                    <FormatListBulleted fontSize="small"/>
                </IconButton>
                <Button
                variant="contained" sx={{backgroundColor: "#115e59", color: "white", fontSize: "12px", textTransform: "none"}}
                onClick={() => {
                    setSelectedCategory("");
                    setIsCreateTaskOpen(true);
                }}><Add fontSize="small"/>Add New Task</Button>
            </div>
            <CreateTask open={isCreateTaskOpen} categoryName={selectedCategory} onClose={()=>setIsCreateTaskOpen(false)} 
             onAddTask={(taskData) => onAddTask({...taskData})}/> 
        </section>
        <section className="flex flex-col mx-10 lg:ml-[100px]">
            <h1 className="font-semibold text-xs text-black mb-4">TODO</h1>
            <div className="flex justify-end flex-col gap-2">
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