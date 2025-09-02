import { useState,useEffect } from "react";
import { Toaster } from "react-hot-toast";

import ProfileAndNotif from "../components/ProfileAndNotif";
import SearchTaskInput from "../features/task/SearchTaskInput";
import Recommended from "../components/Recommended";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import CreateTask from "../features/task/CreateTaskForm";
import FilterMenu from "../components/dropdownMenu/FilterMenu";
import SortMenu from "../components/dropdownMenu/SortMenu";
import RateLimitedUI from "../components/RateLimitedUI";
import TasksList from "../components/TasksList";

import { fetchAllTasks } from "../api/taskService";

function Task() {
    const [isCreateTaskOpen,setIsCreateTaskOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isProfileMenuOpen,setProfileMenuOpen] = useState(false);
    const [isFilterOpen,setIsFilterOpen] = useState(false);
    const [isSortOpen,setIsSortOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sort,setSort] = useState("none");
    const [filters, setFilters] = useState([]);

    const token = localStorage.getItem('token');

    const fetchTask = async () => {
    setIsLoading(true);
    try {
        const res = await fetchAllTasks(sort, filters);
        setTasks(res);
        setIsRateLimited(false);
    } catch (error) {
        if (error.response?.status === 429) setIsRateLimited(true);
        else console.log("Failed to load tasks", error);
    } finally {
        setIsLoading(false);
    }
    };

    useEffect(() => {
        if (!token) return;
        fetchTask();

    }, [sort, filters,token]);

    const handleSortChange = (option) => setSort(option);

    return<div className="flex flex-col h-dvh bg-gray-50 py-2 text-gray-600 lg:ml-[200px] gap-4 font-inter">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex items-center justify-between lg:ml-[100px] p-4 mx-10 relative">
            <h1 className="font-bold text-black text-xl">My Task</h1>
            <SearchTaskInput className="relative lg:block max-md:hidden w-[300px]"/>
            <ProfileAndNotif setProfileMenuOpen={setProfileMenuOpen} isProfileMenuOpen={isProfileMenuOpen}/>
        </div>
        <div className="flex justify-center">
            <SearchTaskInput className="relative md:hidden max-md:block w-[300px] mt-2 z-0"/>
        </div>
        {
            isRateLimited && <RateLimitedUI/>
        }
        <Recommended setIsCreateTaskOpen={setIsCreateTaskOpen} setSelectedCategory={setSelectedCategory}/>
        <div className="flex justify-between items-center mx-10 lg:ml-[100px] max-sm:flex-col-reverse max-sm:gap-2">
            <div className="flex gap-2">
                <div className="relative">
                    <button className=" bg-gray-800 text-white border-gray-300 px-4 py-1 border-1  rounded-md text-xs font-semibold cursor-pointer hover:opacity-95 active:opacity-90 flex items-center relative"
                    onClick={() => {setIsFilterOpen((prev) => !prev)}}><FilterListIcon/>Filter</button>
                    {
                        isFilterOpen && <FilterMenu onChange={setFilters}/>
                    }
                </div>
                <div className="relative">
                    <button className=" bg-gray-800 text-white border-gray-300 px-4 py-1 border-1 rounded-md text-xs font-semibold cursor-pointer hover:opacity-95 active:opacity-90 flex items-center"
                    onClick={() => {setIsSortOpen((prev) => !prev)}}><SortIcon/>Sort</button>
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
                <button
                className="bg-green-900 text-white font-semibold px-3 py-1 rounded-md text-sm cursor-pointer hover:opacity-95 active:opacity-90"
                onClick={() => {
                    setSelectedCategory("");
                    setIsCreateTaskOpen(true);
                }}>+ Add New Task</button>
            </div>
            {
                isCreateTaskOpen && 
                <CreateTask categoryName={selectedCategory} 
                onClose={()=>setIsCreateTaskOpen(false)} 
                fetchTask={() => fetchTask()}/>
            }
        </div>
        <div className="flex flex-col mx-10 lg:ml-[100px]">
            <h1 className="font-semibold text-xs text-black mb-4">TODO</h1>
            <div className="flex justify-end flex-col gap-2">
                <TasksList isLoading={isLoading} tasks={tasks} fetchTask={() => fetchTask()}/>
            </div>
        </div>
    </div>
}

export default Task